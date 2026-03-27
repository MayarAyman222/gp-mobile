/*import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";
import { env } from "./config/env.js";

// ===== ROUTES =====
import iconRoutes from "./routes/iconRoutes.js";
import ttsRoutes from "./routes/ttsRoutes.js";
import translateRoutes from "./routes/translateRoutes.js";
import authRoutes from "./routes/authRoutes.js";
// ===== APP SETUP =====
const app = express();
const PORT = env.port;

// ===== MIDDLEWARES =====
app.use(
  cors({
    origin: env.corsOrigin === "*" ? true : env.corsOrigin,
    credentials: true,
  }),
);
app.use(express.json());
app.use(bodyParser.json({ limit: "1mb" }));
app.set("trust proxy", true);
// ===== STATIC FOLDER FOR GENERATED AUDIO =====
const AUDIO_DIR = path.join(process.cwd(), "generated_audio");
if (!fs.existsSync(AUDIO_DIR)) fs.mkdirSync(AUDIO_DIR);

app.use("/audio", express.static(AUDIO_DIR));

// ===== ROUTES MOUNTING =====
app.use("/api/icons", iconRoutes); // Icons & SubIcons API
app.use("/api/tts", ttsRoutes); // Text-to-Speech API
app.use("/api", translateRoutes); // Translation API
app.use("/api/auth", authRoutes); // Authentication API
// ===== HEALTH CHECK =====
app.get("/", (req, res) => {
  res.send("??? API is running...\n???? Use /api/translate then /api/tts/speak");
});
app.use("/public", express.static(path.join(process.cwd(), "public")));

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log(`Server running on ${hostUrl}`);
});
*/
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch";
import multer from "multer";
import { PrismaClient } from "@prisma/client";
import { env } from "./config/env.js";

// ===== ROUTES =====
import iconRoutes from "./routes/iconRoutes.js";
import ttsRoutes from "./routes/ttsRoutes.js";
import translateRoutes from "./routes/translateRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// ===== APP SETUP =====
const app = express();
const PORT = env.port;
const prisma = new PrismaClient();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===== MULTER SETUP =====
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "public/uploads")),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ===== MIDDLEWARES =====
app.use(
  cors({
    origin: env.corsOrigin === "*" ? true : env.corsOrigin,
    credentials: true,
  }),
);
app.use(express.json());
app.use(bodyParser.json({ limit: "1mb" }));
app.set("trust proxy", true);

// ===== STATIC FOLDERS =====
const AUDIO_DIR = path.join(process.cwd(), "generated_audio");
if (!fs.existsSync(AUDIO_DIR)) fs.mkdirSync(AUDIO_DIR);
app.use("/audio", express.static(AUDIO_DIR));
app.use("/public", express.static(path.join(process.cwd(), "public")));

// ===== HELPER: Download file from URL =====
async function downloadFile(url, folder = "public/uploads") {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to download " + url);
  const buffer = Buffer.from(await res.arrayBuffer());
  const filename = Date.now() + "-" + path.basename(url);
  const filePath = path.join(__dirname, folder, filename);
  fs.writeFileSync(filePath, buffer);
  return `/public/uploads/${filename}`;
}

// ===== ROUTES MOUNTING =====
app.use("/api/icons", iconRoutes);
app.use("/api/tts", ttsRoutes);
app.use("/api", translateRoutes);
app.use("/api/auth", authRoutes);

// ===== HEALTH CHECK =====
app.get("/", (req, res) => {
  res.send("??? API is running...\n???? Use /api/translate then /api/tts/speak");
});

// ===== MAIN CATEGORIES =====
app.get("/api/maincategories", async (req, res) => {
  try {
    const mainCategories = await prisma.mainCategory.findMany();
    res.json(mainCategories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/maincategories/:id/icons", async (req, res) => {
  const mainCategoryId = parseInt(req.params.id);
  try {
    const icons = await prisma.icon.findMany({
      where: { mainCategoryId },
      include: { subIcons: true },
    });
    res.json(icons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/maincategories/:id/timeperiods", async (req, res) => {
  const mainCategoryId = parseInt(req.params.id);
  try {
    const periods = await prisma.timePeriod.findMany({
      where: { mainCategoryId },
      orderBy: [{ order: "asc" }, { id: "asc" }],
    });
    res.json(periods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ===== TIME PERIODS =====
app.get("/api/timeperiods/:id/icons", async (req, res) => {
  const timePeriodId = parseInt(req.params.id);
  try {
    const icons = await prisma.icon.findMany({
      where: { timePeriodId },
      include: { subIcons: true },
    });
    res.json(icons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ===== EMERGENCY NUMBERS =====
app.get("/api/emergency-numbers", async (req, res) => {
  try {
    const rows = await prisma.emergencyNumber.findMany({ orderBy: { id: "asc" } });
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/emergency-numbers", async (req, res) => {
  const { number, label_en, label_ar, label_fr, label_es } = req.body;
  try {
    const row = await prisma.emergencyNumber.upsert({
      where: { number: String(number) },
      update: {
        label_en: label_en ?? "",
        label_ar: label_ar ?? "",
        label_fr: label_fr ?? "",
        label_es: label_es ?? "",
      },
      create: {
        number: String(number),
        label_en: label_en ?? "",
        label_ar: label_ar ?? "",
        label_fr: label_fr ?? "",
        label_es: label_es ?? "",
      },
    });
    res.status(201).json(row);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ===== START SERVER =====
app.listen(PORT, "0.0.0.0", () => {
  const hostUrl = process.env.PUBLIC_BASE_URL || `http://168.231.101.20:${PORT}`;
  console.log(`Server running on ${hostUrl}`);
});
