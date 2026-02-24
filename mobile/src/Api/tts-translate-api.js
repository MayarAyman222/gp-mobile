import { Platform } from "react-native";
const BASE_URL =
  Platform.OS === "web"
  ? "http://168.231.101.20:5550/api"
    :"http://localhost:5000/api"

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