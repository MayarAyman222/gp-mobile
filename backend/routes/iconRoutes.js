import express from "express";
import fs from "fs";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";
import {
  getAllIcons,
  getIconById,
  createIcon,
  updateIcon,
  deleteIcon,
  getSubIconById,
  createSubIcon,
  updateSubIcon,
  deleteSubIcon,
  getSubSubIconById,
  createSubSubIcon,
  updateSubSubIcon,
  deleteSubSubIcon,
} from "../controllers/iconController.js";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOADS_DIR = path.join(__dirname, "..", "public", "uploads");

fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });
const mediaUpload = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "audio", maxCount: 1 },
]);

router.get("/", getAllIcons);
router.get("/:id", getIconById);
router.post("/", createIcon);
router.put("/:id", updateIcon);
router.delete("/:id", deleteIcon);

router.get("/:iconId/subicons/:subIconId", getSubIconById);
router.post("/:iconId/subicons", mediaUpload, createSubIcon);
router.put("/subicons/:id", mediaUpload, updateSubIcon);
router.delete("/subicons/:id", deleteSubIcon);

router.get(
  "/:iconId/subicons/:subIconId/subsubicons/:subSubIconId",
  getSubSubIconById,
);
router.post(
  "/:iconId/subicons/:subIconId/subsubicons",
  mediaUpload,
  createSubSubIcon,
);
router.put("/subsubicons/:id", mediaUpload, updateSubSubIcon);
router.delete("/subsubicons/:id", deleteSubSubIcon);

export default router;
