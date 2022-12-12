import { Router } from "express";


import AssetUploadRoutes from "./AssetsModule/assets.router.js";





const router = Router();





router.use("/assets", AssetUploadRoutes);







export default router;

