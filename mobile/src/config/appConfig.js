import Constants from "expo-constants";

const API_BASE_URL = "http://168.231.101.20:5550";

const extra =
  Constants?.expoConfig?.extra ||
  Constants?.manifest2?.extra ||
  Constants?.manifest?.extra ||
  {};

const runtimeAppEnv = process.env.EXPO_PUBLIC_APP_ENV;
const appEnv = runtimeAppEnv || extra.appEnv || "production";
const apiBaseUrl = API_BASE_URL.replace(/\/$/, "");
const toApiUrl = (baseUrl) => `${baseUrl}/api`;

export const APP_CONFIG = {
  appEnv,
  apiBaseUrl,
  apiUrl: toApiUrl(apiBaseUrl),
  contentApiBaseUrl: apiBaseUrl,
  contentApiUrl: toApiUrl(apiBaseUrl),
  prodApiBaseUrl: apiBaseUrl,
  prodApiUrl: toApiUrl(apiBaseUrl),
  localApiBaseUrl: apiBaseUrl,
  localApiUrl: toApiUrl(apiBaseUrl),
};

export const normalizeMediaUrl = (
  url,
  preferredBaseOrigin = APP_CONFIG.apiBaseUrl,
) => {
  if (!url) return url;
  if (url.startsWith("blob:")) return url; // keep blobs untouched
  const baseOrigin = preferredBaseOrigin.replace(/\/$/, "");

  if (/^https?:\/\//i.test(url)) {
    return url
      .replace(/https?:\/\/localhost(?::\d+)?/i, baseOrigin)
      .replace(/https?:\/\/127\.0\.0\.1(?::\d+)?/i, baseOrigin)
      .replace(/https?:\/\/10\.0\.2\.2(?::\d+)?/i, baseOrigin)
      .replace(/https?:\/\/192\.168\.\d+\.\d+(?::\d+)?/i, baseOrigin);
  }

  if (url.startsWith("/")) return `${baseOrigin}${url}`;
  return `${baseOrigin}/${url}`;
};
