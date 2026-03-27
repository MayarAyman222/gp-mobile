/*import express from "express";
import {
  getAllIcons,
  getIconById,
  createIcon,
  updateIcon,
  deleteIcon,
  getSubIconById,
  createSubIcon,
  updateSubIcon,
  deleteSubIcon
} from "../controllers/iconController.js";

const router = express.Router();

// ===== ICON ROUTES =====
// GET /icons?category=Real%20Life
router.get("/", getAllIcons);

// GET /icons/:id
router.get("/:id", getIconById);

// POST /icons
router.post("/", createIcon);

// PUT /icons/:id
router.put("/:id", updateIcon);

// DELETE /icons/:id
router.delete("/:id", deleteIcon);

// ===== SUBICON ROUTES =====
// GET single subIcon
router.get("/:iconId/subicons/:subIconId", getSubIconById);

// POST new subIcon under an icon
router.post("/:iconId/subicons", createSubIcon);

// PUT update subIcon
router.put("/subicons/:id", updateSubIcon);

// DELETE subIcon
router.delete("/subicons/:id", deleteSubIcon);

export default router;*/
/*import express from "express";
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
} from "../controllers/iconController.js";

const router = express.Router();

// ===== ICONS =====
router.get("/", getAllIcons);
router.get("/:id", getIconById);
router.post("/", createIcon);
router.put("/:id", updateIcon);
router.delete("/:id", deleteIcon);

// ===== SUBICONS =====
router.get("/:iconId/subicons/:subIconId", getSubIconById);
router.post("/:iconId/subicons", createSubIcon);
router.put("/subicons/:id", updateSubIcon);
router.delete("/subicons/:id", deleteSubIcon);

export default router;*/
import express from "express";
import multer from "multer"; // استيراد multer
import path from "path";
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
} from "../controllers/iconController.js";

const router = express.Router();

// ===== MULTER =====
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/uploads"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ===== ICONS =====
router.get("/", getAllIcons);
router.get("/:id", getIconById);
router.post("/", createIcon);
router.put("/:id", updateIcon);
router.delete("/:id", deleteIcon);

// ===== SUBICONS =====
router.get("/:iconId/subicons/:subIconId", getSubIconById);

// **هنا نضيف multer**
router.post("/:iconId/subicons", upload.single("image"), createSubIcon);

router.put("/subicons/:id", updateSubIcon);
router.delete("/subicons/:id", deleteSubIcon);

export default router;