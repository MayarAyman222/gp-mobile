import express from "express";
import { recognizeDrawing } from "../controllers/drawingController.js";

const router = express.Router();

router.post("/ocr", recognizeDrawing);

export default router;
