import { APP_CONFIG } from "../config/appConfig";

const PRIMARY_BASE_URL = APP_CONFIG.apiUrl;
const LOCAL_BASE_URL = APP_CONFIG.localApiUrl;
const PROD_BASE_URL = APP_CONFIG.prodApiUrl;
const preferLocalFirst = ["development", "local"].includes(APP_CONFIG.appEnv);

const buildApiCandidates = () => {
  const orderedBases = preferLocalFirst
    ? [LOCAL_BASE_URL, PRIMARY_BASE_URL, PROD_BASE_URL]
    : [PRIMARY_BASE_URL, LOCAL_BASE_URL, PROD_BASE_URL];

  return [...new Set(orderedBases.filter(Boolean))];
};

export const translateText = async (text, targetLang) => {
  const res = await fetch(`${PRIMARY_BASE_URL}/translate`, {
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

  let lastError = null;

  for (const base of buildApiCandidates()) {
    try {
      return await callApi(base);
    } catch (err) {
      lastError = err;
      console.warn(`TTS failed via ${base}:`, err?.message);
    }
  }

  return { ok: false, message: lastError?.message || "TTS failed" };
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

  let lastError = null;

  for (const base of buildApiCandidates()) {
    try {
      return await callApi(base);
    } catch (err) {
      lastError = err;
      console.warn(`OCR failed via ${base}:`, err?.message);
    }
  }

  throw lastError || new Error("OCR failed");
};
