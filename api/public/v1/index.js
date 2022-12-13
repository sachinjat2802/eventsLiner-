import { Router } from "express";


import AssetUploadRoutes from "./AssetsModule/assets.router.js";
import adminUserRoutes from "./AdminUserModule/adminUserAuth.router.js";




const router = Router();





router.use("/assets", AssetUploadRoutes);
router.use("/adminUser",adminUserRoutes);







export default router;

