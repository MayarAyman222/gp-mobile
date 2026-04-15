import Constants from "expo-constants";

const DEFAULT_API_BASE = "http://168.231.101.20:5550";
const DEFAULT_LOCAL_API_BASE = DEFAULT_API_BASE;

const extra =
  Constants?.expoConfig?.extra ||
  Constants?.manifest2?.extra ||
  Constants?.manifest?.extra ||
  {};

// Runtime overrides (EAS env vars). Dev falls back to prod to avoid localhost.
const runtimeAppEnv = process.env.EXPO_PUBLIC_APP_ENV;
const runtimeDevApiBaseUrl = process.env.EXPO_PUBLIC_DEV_API_BASE_URL;
const runtimeProdApiBaseUrl = process.env.EXPO_PUBLIC_PROD_API_BASE_URL;
const runtimeLocalApiBaseUrl = process.env.EXPO_PUBLIC_LOCAL_API_BASE_URL;
const runtimeContentApiBaseUrl = process.env.EXPO_PUBLIC_CONTENT_API_BASE_URL;

const appEnv = runtimeAppEnv || extra.appEnv || "production";
const prodApiBaseUrl = runtimeProdApiBaseUrl || extra.prodApiBaseUrl || DEFAULT_API_BASE;
const devApiBaseUrl =
  runtimeDevApiBaseUrl || extra.devApiBaseUrl || prodApiBaseUrl || DEFAULT_API_BASE;
const localApiBaseUrl =
  runtimeLocalApiBaseUrl ||
  extra.localApiBaseUrl ||
  DEFAULT_LOCAL_API_BASE;

// Legacy/old flows stay on production by default.
const apiBaseUrl = prodApiBaseUrl || devApiBaseUrl;
// Content hierarchy flows also use the production API by default.
// Override with EXPO_PUBLIC_CONTENT_API_BASE_URL if you explicitly want another host.
const defaultContentApiBaseUrl = apiBaseUrl;
const contentApiBaseUrl =
  runtimeContentApiBaseUrl ||
  extra.contentApiBaseUrl ||
  defaultContentApiBaseUrl;

const toApiUrl = (baseUrl) => `${baseUrl.replace(/\/$/, "")}/api`;

export const APP_CONFIG = {
  appEnv,
  apiBaseUrl: apiBaseUrl.replace(/\/$/, ""),
  apiUrl: toApiUrl(apiBaseUrl),
  contentApiBaseUrl: contentApiBaseUrl.replace(/\/$/, ""),
  contentApiUrl: toApiUrl(contentApiBaseUrl),
  prodApiBaseUrl: prodApiBaseUrl.replace(/\/$/, ""),
  prodApiUrl: toApiUrl(prodApiBaseUrl),
  localApiBaseUrl: localApiBaseUrl.replace(/\/$/, ""),
  localApiUrl: toApiUrl(localApiBaseUrl),
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
