import Constants from "expo-constants";

const extra =
  Constants?.expoConfig?.extra ||
  Constants?.manifest2?.extra ||
  Constants?.manifest?.extra ||
  {};

const DEFAULT_DEV_API_BASE = "http://localhost:5550";
const DEFAULT_PROD_API_BASE = "http://168.231.101.20:5550";

const runtimeAppEnv = process.env.EXPO_PUBLIC_APP_ENV;
const runtimeDevApiBaseUrl = process.env.EXPO_PUBLIC_DEV_API_BASE_URL;
const runtimeProdApiBaseUrl = process.env.EXPO_PUBLIC_PROD_API_BASE_URL;

const appEnv = __DEV__
  ? runtimeAppEnv || extra.appEnv || "development"
  : "production";

const devApiBaseUrl =
  runtimeDevApiBaseUrl || extra.devApiBaseUrl || DEFAULT_DEV_API_BASE;
const prodApiBaseUrl =
  runtimeProdApiBaseUrl || extra.prodApiBaseUrl || DEFAULT_PROD_API_BASE;

const apiBaseUrl = appEnv === "production" ? prodApiBaseUrl : devApiBaseUrl;

const toApiUrl = (baseUrl) => `${baseUrl.replace(/\/$/, "")}/api`;

export const APP_CONFIG = {
  appEnv,
  apiBaseUrl: apiBaseUrl.replace(/\/$/, ""),
  apiUrl: toApiUrl(apiBaseUrl),
};

const baseOrigin = APP_CONFIG.apiBaseUrl;

export const normalizeMediaUrl = (url) => {
  if (!url) return url;

  if (/^https?:\/\//i.test(url)) {
    return url
      .replace(/https?:\/\/localhost(?::\d+)?/i, baseOrigin)
      .replace(/https?:\/\/168\.231\.101\.20(?::\d+)?/i, baseOrigin);
  }

  if (url.startsWith("/")) {
    return `${baseOrigin}${url}`;
  }

  return `${baseOrigin}/${url}`;
};
