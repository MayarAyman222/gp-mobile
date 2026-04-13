import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import tesseractPkg from "tesseract.js";

const { createWorker, PSM } = tesseractPkg;

const OCR_DIR = path.join(process.cwd(), "generated_ocr");
const TARGET_WIDTH = 1400;
const TARGET_HEIGHT = 700;
const PADDING = 80;
const workerCache = new Map();

const ensureOcrDir = async () => {
  await fs.mkdir(OCR_DIR, { recursive: true });
};

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const mapLanguage = (language = "en-US") => {
  const value = String(language).toLowerCase();
  if (value.startsWith("ar")) return "ara+eng";
  if (value.startsWith("fr")) return "fra+eng";
  if (value.startsWith("es")) return "spa+eng";
  return "eng";
};

const getWorker = async (lang) => {
  if (!workerCache.has(lang)) {
    workerCache.set(
      lang,
      (async () => {
        const worker = await createWorker(lang, 1, {
          cachePath: OCR_DIR,
          logger: ({ status, progress }) => {
            if (status && Number.isFinite(progress)) {
              console.log(
                `[drawing-ocr:${lang}] ${status} ${Math.round(progress * 100)}%`,
              );
            }
          },
        });
        await worker.setParameters({
          tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
          preserve_interword_spaces: "1",
        });
        return worker;
      })(),
    );
  }

  return workerCache.get(lang);
};

const collectBounds = (strokes = []) => {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const stroke of strokes) {
    for (const point of stroke.points || []) {
      minX = Math.min(minX, point.x);
      minY = Math.min(minY, point.y);
      maxX = Math.max(maxX, point.x);
      maxY = Math.max(maxY, point.y);
    }
  }

  if (!Number.isFinite(minX)) {
    return null;
  }

  return {
    minX,
    minY,
    maxX,
    maxY,
    width: Math.max(1, maxX - minX),
    height: Math.max(1, maxY - minY),
  };
};

const normalizeDrawing = (drawing) => {
  const strokes = Array.isArray(drawing?.strokes) ? drawing.strokes : [];
  const bounds = collectBounds(strokes);

  if (!bounds) {
    throw new Error("Drawing is empty.");
  }

  const availableWidth = TARGET_WIDTH - PADDING * 2;
  const availableHeight = TARGET_HEIGHT - PADDING * 2;
  const scale = Math.min(
    availableWidth / bounds.width,
    availableHeight / bounds.height,
  );

  const scaledWidth = bounds.width * scale;
  const scaledHeight = bounds.height * scale;
  const offsetX = (TARGET_WIDTH - scaledWidth) / 2 - bounds.minX * scale;
  const offsetY = (TARGET_HEIGHT - scaledHeight) / 2 - bounds.minY * scale;

  return strokes
    .filter((stroke) => Array.isArray(stroke.points) && stroke.points.length)
    .map((stroke) => ({
      strokeWidth: clamp(
        Math.round((stroke.strokeWidth || 10) * scale * 1.35),
        10,
        34,
      ),
      points: stroke.points.map((point) => ({
        x: point.x * scale + offsetX,
        y: point.y * scale + offsetY,
      })),
    }));
};

const drawCircle = (pixels, width, height, centerX, centerY, radius) => {
  const minX = Math.floor(centerX - radius);
  const maxX = Math.ceil(centerX + radius);
  const minY = Math.floor(centerY - radius);
  const maxY = Math.ceil(centerY + radius);
  const radiusSquared = radius * radius;

  for (let y = minY; y <= maxY; y += 1) {
    if (y < 0 || y >= height) continue;
    for (let x = minX; x <= maxX; x += 1) {
      if (x < 0 || x >= width) continue;
      const dx = x - centerX;
      const dy = y - centerY;
      if (dx * dx + dy * dy <= radiusSquared) {
        pixels[y * width + x] = 0;
      }
    }
  }
};

const drawLine = (pixels, width, height, from, to, strokeWidth) => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const steps = Math.max(Math.abs(dx), Math.abs(dy), 1);
  const radius = Math.max(2, strokeWidth / 2);

  for (let i = 0; i <= steps; i += 1) {
    const progress = i / steps;
    drawCircle(
      pixels,
      width,
      height,
      from.x + dx * progress,
      from.y + dy * progress,
      radius,
    );
  }
};

const writePgmImage = async (drawing) => {
  await ensureOcrDir();
  const pixels = new Uint8Array(TARGET_WIDTH * TARGET_HEIGHT).fill(255);
  const normalizedStrokes = normalizeDrawing(drawing);

  for (const stroke of normalizedStrokes) {
    const { points, strokeWidth } = stroke;
    if (points.length === 1) {
      drawCircle(
        pixels,
        TARGET_WIDTH,
        TARGET_HEIGHT,
        points[0].x,
        points[0].y,
        Math.max(3, strokeWidth / 2),
      );
      continue;
    }

    for (let i = 1; i < points.length; i += 1) {
      drawLine(
        pixels,
        TARGET_WIDTH,
        TARGET_HEIGHT,
        points[i - 1],
        points[i],
        strokeWidth,
      );
    }
  }

  const header = Buffer.from(`P5\n${TARGET_WIDTH} ${TARGET_HEIGHT}\n255\n`);
  const filePath = path.join(OCR_DIR, `${randomUUID()}.pgm`);
  await fs.writeFile(filePath, Buffer.concat([header, Buffer.from(pixels)]));
  return filePath;
};

export const recognizeDrawing = async (req, res) => {
  let imagePath = null;

  try {
    const { drawing, language } = req.body || {};
    if (!drawing || !Array.isArray(drawing.strokes) || !drawing.strokes.length) {
      return res.status(400).json({
        ok: false,
        message: "A drawing with at least one stroke is required.",
      });
    }

    imagePath = await writePgmImage(drawing);
    const lang = mapLanguage(language);
    const worker = await getWorker(lang);
    const {
      data: { text = "", confidence = null },
    } = await worker.recognize(imagePath);

    return res.json({
      ok: true,
      text: String(text)
        .replace(/\r/g, "")
        .replace(/\n{3,}/g, "\n\n")
        .trim(),
      confidence,
    });
  } catch (err) {
    console.error("Drawing OCR error:", err);
    return res.status(500).json({
      ok: false,
      message: err.message || "Drawing OCR failed.",
    });
  } finally {
    if (imagePath) {
      await fs.unlink(imagePath).catch(() => {});
    }
  }
};
