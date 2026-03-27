import Constants from "expo-constants";

// Force all environments to use the production API.
const DEFAULT_API_BASE = "http://168.231.101.20:5550";

const extra =
  Constants?.expoConfig?.extra ||
  Constants?.manifest2?.extra ||
  Constants?.manifest?.extra ||
  {};

// Runtime overrides (EAS env vars). Dev falls back to prod to avoid localhost.
const runtimeAppEnv = process.env.EXPO_PUBLIC_APP_ENV;
const runtimeDevApiBaseUrl = process.env.EXPO_PUBLIC_DEV_API_BASE_URL;
const runtimeProdApiBaseUrl = process.env.EXPO_PUBLIC_PROD_API_BASE_URL;

const appEnv = runtimeAppEnv || extra.appEnv || "production";
const prodApiBaseUrl = runtimeProdApiBaseUrl || extra.prodApiBaseUrl || DEFAULT_API_BASE;
const devApiBaseUrl =
  runtimeDevApiBaseUrl || extra.devApiBaseUrl || prodApiBaseUrl || DEFAULT_API_BASE;

// Always hit production host.
const apiBaseUrl = prodApiBaseUrl || devApiBaseUrl;
const toApiUrl = (baseUrl) => `${baseUrl.replace(/\/$/, "")}/api`;

export const APP_CONFIG = {
  appEnv,
  apiBaseUrl: apiBaseUrl.replace(/\/$/, ""),
  apiUrl: toApiUrl(apiBaseUrl),
};

// Normalize any media URL to the current API origin.
const baseOrigin = APP_CONFIG.apiBaseUrl;

export const normalizeMediaUrl = (url) => {
  if (!url) return url;
  if (url.startsWith("blob:")) return url; // keep blobs untouched

  if (/^https?:\/\//i.test(url)) {
    return url
      .replace(/https?:\/\/localhost(?::\d+)?/i, baseOrigin)
      .replace(/https?:\/\/192\.168\.\d+\.\d+(?::\d+)?/i, baseOrigin);
  }

  if (url.startsWith("/")) return `${baseOrigin}${url}`;
  return `${baseOrigin}/${url}`;
};
