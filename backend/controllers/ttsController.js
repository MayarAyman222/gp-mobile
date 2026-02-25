// controllers/ttsController.js
import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import pkg from "uuid";
const { v4: uuidv4 } = pkg;

const buildGoogleTtsUrl = (text, language, slow) => {
  const params = new URLSearchParams({
    ie: "UTF-8",
    tl: language || "en",
    client: "tw-ob",
    q: text,
  });

  if (slow) {
    params.set("ttsspeed", "0.24");
  }

  return `https://translate.google.com/translate_tts?${params.toString()}`;
};

const AUDIO_DIR = path.join(process.cwd(), "generated_audio");

export const speakText = async (req, res) => {
  try {
    const {
      text = "",
      language = "en",
      slow = false,
      filename: clientFilename,
    } = req.body;

    if (!text.trim()) {
      return res.status(400).json({ ok: false, message: "text is required" });
    }

    const id = uuidv4();
    const outFilename = clientFilename
      ? path.join(AUDIO_DIR, clientFilename)
      : path.join(AUDIO_DIR, `speech-${id}.mp3`);

    const url = buildGoogleTtsUrl(text, language, slow);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `TTS upstream request failed with status ${response.status}`,
      );
    }

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("audio") && !contentType.includes("mpeg")) {
      throw new Error(
        `TTS upstream returned non-audio content: ${contentType || "unknown"}`,
      );
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    if (!buffer.length) {
      throw new Error("TTS generated empty audio file");
    }

    fs.writeFileSync(outFilename, buffer);

    const fileUrl = `${req.protocol}://${req.get("host")}/audio/${path.basename(outFilename)}`;
    console.log(`Generated TTS audio: ${fileUrl}`);
    return res.json({
      ok: true,
      url: fileUrl,
      filename: path.basename(outFilename),
    });
  } catch (err) {
    console.error("TTS error:", err);
    return res.status(500).json({ ok: false, message: err.message });
  }
};
// Import the correct package
// import * as googleTTS from 'google-tts-api'; // ES6 or TypeScript

// // Text to convert
// const text = 'Hello, this is a test.';
// const lang = 'en';
// const speed = 1;

// // Get the audio URL
// const url = googleTTS.getAudioUrl(text, {
//   lang,
//   slow: speed !== 1,
//   host: 'https://translate.google.com',
// });

// console.log('Audio URL:', url);
