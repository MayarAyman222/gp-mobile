import { APP_CONFIG } from "../config/appConfig";

const BASE_URL = APP_CONFIG.apiUrl;

export const sendChatMessage = async ({ message, language, history = [] }) => {
  const response = await fetch(`${BASE_URL}/chatbot`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      language,
      history,
    }),
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload?.message || `Chatbot failed (${response.status})`);
  }

  return payload;
};
