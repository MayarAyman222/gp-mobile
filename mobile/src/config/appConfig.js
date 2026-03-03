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
/*import Constants from "expo-constants";

// Extra من app.json أو app.config.js
const extra =
  Constants?.expoConfig?.extra ||
  Constants?.manifest2?.extra ||
  Constants?.manifest?.extra ||
  {};

// القيم الافتراضية
const DEFAULT_DEV_API_BASE = "http://localhost:5550";
const DEFAULT_PROD_API_BASE = "http://168.231.101.20:5550";

// قيم من environment variables لو موجودة
const runtimeDevApiBaseUrl = process.env.EXPO_PUBLIC_DEV_API_BASE_URL;
const runtimeProdApiBaseUrl = process.env.EXPO_PUBLIC_PROD_API_BASE_URL;

// تحديد البيئة: development لو __DEV__ true، وإلا production
const appEnv = __DEV__ ? "development" : "production";

// تحديد الـ API base URLs لكل بيئة
const devApiBaseUrl =
  runtimeDevApiBaseUrl || extra.devApiBaseUrl || DEFAULT_DEV_API_BASE;
const prodApiBaseUrl =
  runtimeProdApiBaseUrl || extra.prodApiBaseUrl || DEFAULT_PROD_API_BASE;

// اختيار URL النهائي حسب البيئة
const apiBaseUrl = appEnv === "production" ? prodApiBaseUrl : devApiBaseUrl;

// تحويل Base URL ليتوافق مع الـ /api
const toApiUrl = (baseUrl) => `${baseUrl.replace(/\/$/, "")}/api`;

export const APP_CONFIG = {
  appEnv,
  apiBaseUrl: apiBaseUrl.replace(/\/$/, ""),
  apiUrl: toApiUrl(apiBaseUrl),
};

// لتعديل أي روابط media لتتوافق مع البيئة الحالية
const baseOrigin = APP_CONFIG.apiBaseUrl;

export const normalizeMediaUrl = (url) => {
  if (!url) return url;

  // لو الرابط كامل (http:// أو https://)
  if (/^https?:\/\//i.test(url)) {
    return url
      .replace(/https?:\/\/localhost(?::\d+)?/i, baseOrigin)
      .replace(/https?:\/\/168\.231\.101\.20(?::\d+)?/i, baseOrigin);
  }

  // لو الرابط يبدأ بـ /
  if (url.startsWith("/")) {
    return `${baseOrigin}${url}`;
  }

  // أي رابط نسبي آخر
  return `${baseOrigin}/${url}`;
};
*/