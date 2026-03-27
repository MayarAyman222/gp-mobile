/*import Constants from "expo-constants";

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
};*/
/*import Constants from "expo-constants";

// Extra من app.json أو app.config.js
const extra =
  Constants?.expoConfig?.extra ||
  Constants?.manifest2?.extra ||
  Constants?.manifest?.extra ||
  {};

// القيم الافتراضية
const DEFAULT_DEV_API_BASE = "http://192.168.0.104:5550";

//const DEFAULT_DEV_API_BASE = "http://localhost:5550";
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

  // حافظ على روابط blob كما هي (تستخدمها expo-av أحياناً)
  if (url.startsWith("blob:")) return url;

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
import Constants from "expo-constants";

// Extra من app.json أو app.config.js
const extra =
  Constants?.expoConfig?.extra ||
  Constants?.manifest2?.extra ||
  Constants?.manifest?.extra ||
  {};

// ⚡ DEVELOPMENT: استخدمي IP جهاز الكمبيوتر اللي شغّل السيرفر عليه
// مثلاً: 192.168.0.104
const DEFAULT_DEV_API_BASE = "http://192.168.0.104:5550";

// PRODUCTION: عنوان السيرفر الحقيقي
const DEFAULT_PROD_API_BASE = "http://168.231.101.20:5550";

// لو عندك environment variables
const runtimeDevApiBaseUrl = process.env.EXPO_PUBLIC_DEV_API_BASE_URL;
const runtimeProdApiBaseUrl = process.env.EXPO_PUBLIC_PROD_API_BASE_URL;

// تحديد البيئة
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

/*export const normalizeMediaUrl = (url) => {
  if (!url) return url;

  const LOCAL_IP = "192.168.0.104"; // ← نفس IP بتاعك

  // لو URL كامل
  if (url.startsWith("http")) {
    try {
      const parsed = new URL(url);

      // لو localhost → نحوله لـ IP
      if (parsed.hostname === "localhost") {
        return `${parsed.protocol}//${LOCAL_IP}:${parsed.port}${parsed.pathname}`;
      }

      return url;
    } catch (e) {
      console.log("URL parse error:", e);
      return url;
    }
  }

  // لو relative path
  if (url.startsWith("/")) {
    return `${APP_CONFIG.apiBaseUrl}${url}`;
  }

  return `${APP_CONFIG.apiBaseUrl}/${url}`;
};
*/
// ترجع رابط صوت جاهز للتشغيل

  export const normalizeMediaUrl = (url) => {
  if (!url) return url;

  const LOCAL_IP = "192.168.0.104"; // IP جهازك اللي عليه السيرفر
  const PORT = 5550;

  // لو URL blob
  if (url.startsWith("blob:")) {
    const filename = url.split("-").pop() + ".mp3"; // افترضنا MP3
    return `http://${LOCAL_IP}:${PORT}/audio/${filename}`;
  }

  // لو URL كامل http(s)
  if (/^https?:\/\//i.test(url)) {
    try {
      const parsed = new URL(url);
      if (parsed.hostname === "localhost") {
        return `${parsed.protocol}//${LOCAL_IP}:${parsed.port}${parsed.pathname}`;
      }
      return url;
    } catch (e) {
      console.warn("URL parse error:", e);
      return url;
    }
  }

  // لو relative path
  if (url.startsWith("/")) {
    return `http://${LOCAL_IP}:${PORT}${url}`;
  }

  return `http://${LOCAL_IP}:${PORT}/${url}`;
};