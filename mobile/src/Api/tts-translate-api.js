import { APP_CONFIG } from "../config/appConfig";

const BASE_URL = APP_CONFIG.apiUrl;

export const translateText = async (text, targetLang) => {
  const res = await fetch(`${BASE_URL}/translate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, targetLang }),
  });

  return await res.json();
};

export const speakText = async (text, language) => {
  const res = await fetch(`${BASE_URL}/tts/speak`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, language }),
  });

  return await res.json();
};
