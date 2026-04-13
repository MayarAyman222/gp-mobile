import { APP_CONFIG } from "../config/appConfig";

const BASE_URL = APP_CONFIG.apiUrl;
// Fallback aligned to production host to avoid localhost usage.
const FALLBACK_BASE_URL = "http://168.231.101.20:5550/api";
const LOCAL_BASE_URL = APP_CONFIG.localApiUrl;

export const translateText = async (text, targetLang) => {
  const res = await fetch(`${BASE_URL}/translate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, targetLang }),
  });

  return await res.json();
};

export const speakText = async (text, language) => {
  const callApi = async (base) => {
    console.log("TTS request to:", `${base}/tts/speak`);
    const res = await fetch(`${base}/tts/speak`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, language }),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(json?.message || `TTS failed (${res.status})`);
    return json;
  };

  try {
    return await callApi(BASE_URL);
  } catch (err) {
    console.warn("TTS primary failed, trying fallback:", err?.message);
    try {
      return await callApi(FALLBACK_BASE_URL);
    } catch (err2) {
      console.error("TTS fallback failed:", err2?.message);
      return { ok: false, message: err2?.message || "TTS failed" };
    }
  }
};

export const recognizeDrawing = async (drawing, language) => {
  const callApi = async (base) => {
    const res = await fetch(`${base}/drawing/ocr`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ drawing, language }),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(json?.message || `OCR failed (${res.status})`);
    return json;
  };

  try {
    return await callApi(LOCAL_BASE_URL);
  } catch (err) {
    console.warn("OCR local failed, trying production fallback:", err?.message);
    try {
      return await callApi(BASE_URL);
    } catch (err2) {
      console.warn("OCR production primary failed, trying final fallback:", err2?.message);
      return await callApi(FALLBACK_BASE_URL);
    }
  }
};
