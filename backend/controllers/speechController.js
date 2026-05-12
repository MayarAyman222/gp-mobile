import fetch from "node-fetch";
import { env } from "../config/env.js";

const languageToIso639 = (language = "en-US") => {
  const value = String(language).toLowerCase();
  if (value.startsWith("ar")) return "ar";
  if (value.startsWith("fr")) return "fr";
  if (value.startsWith("es")) return "es";
  return "en";
};

export const transcribeSpeech = async (req, res) => {
  try {
    if (!env.groqApiKey) {
      return res.status(500).json({
        message: "Speech transcription is not configured. Set GROQ_API_KEY.",
      });
    }

    if (!req.file?.buffer) {
      return res.status(400).json({ message: "Audio file is required." });
    }

    const language = languageToIso639(req.body?.language);
    const fileName = req.file.originalname || `speech-${Date.now()}.m4a`;
    const fileType = req.file.mimetype || "audio/m4a";

    const formData = new FormData();
    formData.append("model", env.groqTranscriptionModel);
    formData.append("language", language);
    formData.append(
      "file",
      new Blob([req.file.buffer], { type: fileType }),
      fileName,
    );

    const upstream = await fetch(env.groqTranscriptionApiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.groqApiKey}`,
      },
      body: formData,
    });

    const raw = await upstream.text();
    let payload = {};
    if (raw) {
      try {
        payload = JSON.parse(raw);
      } catch {
        payload = { message: raw };
      }
    }

    if (!upstream.ok) {
      return res.status(upstream.status).json({
        message: payload.error?.message || payload.message || "Transcription failed.",
      });
    }

    res.json({
      text: String(payload.text || "").trim(),
      language,
    });
  } catch (error) {
    console.error("Speech transcription error:", error);
    res.status(500).json({ message: "Speech transcription failed." });
  }
};
