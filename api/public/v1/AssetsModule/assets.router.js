import { Router } from "express";
import AssetUploadController from "./assets.controller.js";
const router = Router();

router.post("/uploadSingleImage", AssetUploadController.uploadSingleImage);

router.post("/uploadVideo", AssetUploadController.uploadVideo);

router.post("/uploadMultipleImages", AssetUploadController.uploadMultipleImage);

router.post("/uploadDocument", AssetUploadController.uploadDocument);

export default router;
