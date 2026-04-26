import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import googleTTS from "google-tts-api";
import pkg from "uuid";
import { env } from "../config/env.js";

const { v4: uuidv4 } = pkg;

const AUDIO_DIR = path.join(process.cwd(), "generated_audio");
const GOOGLE_TTS_HOST = "https://translate.google.com";
const GOOGLE_TTS_HEADERS = {
  Accept: "audio/mpeg,audio/*;q=0.9,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
  Origin: GOOGLE_TTS_HOST,
  Referer: `${GOOGLE_TTS_HOST}/`,
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
    "(KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
};
const GOOGLE_TTS_SPLIT_PUNCT = ",.;:!?،؛؟";

const sanitizeText = (value) => String(value ?? "").replace(/\s+/g, " ").trim();

const normalizeLanguage = (value) => {
  const normalized = sanitizeText(value).replace(/_/g, "-");
  if (!normalized) return "en";
  return normalized;
};

const buildOutputFilename = (clientFilename) => {
  const safeBaseName = path.basename(sanitizeText(clientFilename));
  if (!safeBaseName) {
    return `speech-${uuidv4()}.mp3`;
  }

  return safeBaseName.toLowerCase().endsWith(".mp3")
    ? safeBaseName
    : `${safeBaseName}.mp3`;
};

const fetchAudioChunk = async (url) => {
  const response = await fetch(url, {
    headers: GOOGLE_TTS_HEADERS,
  });

  if (!response.ok) {
    throw new Error(`TTS upstream request failed with status ${response.status}`);
  }

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("audio") && !contentType.includes("mpeg")) {
    throw new Error(
      `TTS upstream returned non-audio content: ${contentType || "unknown"}`,
    );
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  if (!buffer.length) {
    throw new Error("TTS generated an empty audio chunk");
  }

  return buffer;
};

export const speakText = async (req, res) => {
  try {
    const {
      text = "",
      language = "en",
      slow = false,
      filename: clientFilename,
    } = req.body ?? {};

    const cleanText = sanitizeText(text);
    if (!cleanText) {
      return res.status(400).json({ ok: false, message: "text is required" });
    }

    fs.mkdirSync(AUDIO_DIR, { recursive: true });

    const audioParts = googleTTS.getAllAudioUrls(cleanText, {
      host: GOOGLE_TTS_HOST,
      lang: normalizeLanguage(language),
      slow: Boolean(slow),
      splitPunct: GOOGLE_TTS_SPLIT_PUNCT,
    });

    if (!audioParts.length) {
      throw new Error("TTS could not generate any audio chunks");
    }

    const chunkBuffers = [];
    for (const part of audioParts) {
      chunkBuffers.push(await fetchAudioChunk(part.url));
    }

    const combinedBuffer = Buffer.concat(chunkBuffers);
    if (!combinedBuffer.length) {
      throw new Error("TTS generated an empty audio file");
    }

    const outFilename = path.join(AUDIO_DIR, buildOutputFilename(clientFilename));
    fs.writeFileSync(outFilename, combinedBuffer);

    const baseUrl = env.publicBaseUrl || `${req.protocol}://${req.get("host")}`;
    const fileUrl = `${baseUrl}/audio/${path.basename(outFilename)}`;
    console.log(`Generated TTS audio: ${fileUrl} (${audioParts.length} chunk(s))`);

    return res.json({
      ok: true,
      url: fileUrl,
      filename: path.basename(outFilename),
      chunkCount: audioParts.length,
    });
  } catch (err) {
    const statusCode = err instanceof RangeError ? 400 : 500;
    console.error("TTS error:", err);
    return res.status(statusCode).json({
      ok: false,
      message: err?.message || "TTS failed",
    });
  }
};
