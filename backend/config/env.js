import "dotenv/config";

const isProduction = process.env.NODE_ENV === "production";

const port = Number(process.env.PORT) || 5550;
const publicBaseUrl = process.env.PUBLIC_BASE_URL || "";
const corsOrigin = process.env.CORS_ORIGIN || "*";

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  isProduction,
  port,
  publicBaseUrl,
  corsOrigin,
};
