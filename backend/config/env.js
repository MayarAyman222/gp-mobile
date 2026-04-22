import "dotenv/config";

const isProduction = process.env.NODE_ENV === "production";

const port = Number(process.env.PORT) || 5550;
const publicBaseUrl = process.env.PUBLIC_BASE_URL || "";
const corsOrigin = process.env.CORS_ORIGIN || "*";
const groqApiKey = process.env.GROQ_API_KEY || "";
const groqModel = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";
const groqApiUrl =
  process.env.GROQ_API_URL || "https://api.groq.com/openai/v1/chat/completions";
const openRouterApiKey = process.env.OPENROUTER_API_KEY || "";
const openRouterModel = process.env.OPENROUTER_MODEL || "openrouter/free";
const openRouterApiUrl =
  process.env.OPENROUTER_API_URL || "https://openrouter.ai/api/v1/chat/completions";

const hasCustomChatbotConfig = Boolean(
  process.env.CHATBOT_API_URL ||
    process.env.CHATBOT_API_KEY ||
    process.env.CHATBOT_MODEL,
);

const requestedProvider = (process.env.CHATBOT_PROVIDER || "").toLowerCase().trim();

const resolveProviderName = () => {
  if (requestedProvider) {
    return requestedProvider;
  }

  if (hasCustomChatbotConfig) {
    return "custom";
  }

  if (groqApiKey) {
    return "groq";
  }

  if (openRouterApiKey) {
    return "openrouter";
  }

  return "local";
};

const chatbotProviderName = resolveProviderName();

const providerConfigByName = {
  custom: {
    apiUrl: process.env.CHATBOT_API_URL || "",
    apiKey: process.env.CHATBOT_API_KEY || "",
    model: process.env.CHATBOT_MODEL || "",
    httpReferer: process.env.CHATBOT_HTTP_REFERER || "",
    appTitle: process.env.CHATBOT_APP_TITLE || "GP AAC Chatbot",
  },
  groq: {
    apiUrl: groqApiUrl,
    apiKey: groqApiKey,
    model: groqModel,
    httpReferer: "",
    appTitle: "",
  },
  openrouter: {
    apiUrl: openRouterApiUrl,
    apiKey: openRouterApiKey,
    model: openRouterModel,
    httpReferer:
      process.env.CHATBOT_HTTP_REFERER ||
      process.env.OPENROUTER_HTTP_REFERER ||
      "",
    appTitle:
      process.env.CHATBOT_APP_TITLE ||
      process.env.OPENROUTER_APP_TITLE ||
      "GP AAC Chatbot",
  },
  local: {
    apiUrl: "",
    apiKey: "",
    model: "",
    httpReferer: "",
    appTitle: "",
  },
};

const selectedProvider =
  providerConfigByName[chatbotProviderName] || providerConfigByName.local;

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  isProduction,
  port,
  publicBaseUrl,
  corsOrigin,
  chatbotProviderName,
  chatbotApiUrl: selectedProvider.apiUrl,
  chatbotApiKey: selectedProvider.apiKey,
  chatbotModel: selectedProvider.model,
  chatbotHttpReferer: selectedProvider.httpReferer,
  chatbotAppTitle: selectedProvider.appTitle,
};
