import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import gTTS from "google-tts-api";
import pkg from "uuid";
const { v4: uuidv4 } = pkg;

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

    // ✅ اتأكد إن الفولدر موجود
    if (!fs.existsSync(AUDIO_DIR)) {
      fs.mkdirSync(AUDIO_DIR, { recursive: true });
    }

    const id = uuidv4();
    const safeFilename = clientFilename
      ? clientFilename.replace(/[^a-zA-Z0-9.-]/g, "")
      : `speech-${id}.mp3`;
    const outFilename = path.join(AUDIO_DIR, safeFilename);

    const url = gTTS.getAudioUrl(text, { lang: language, slow });
    const response = await fetch(url);
    const buffer = Buffer.from(await response.arrayBuffer());
    fs.writeFileSync(outFilename, buffer);

    // ✅ طريقة أنضف لبناء اللينك + BASE_URL لو موجودة
    const baseUrl =
      process.env.BASE_URL || `${req.protocol}://${req.get("host")}`;
    const fileUrl = new URL(`/audio/${path.basename(outFilename)}`, baseUrl)
      .href;

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
