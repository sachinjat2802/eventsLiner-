import { Router } from "express";
import AssetUploadRoutes from "./AssetsModule/assets.router.js";
import adminUserRoutes from "./AdminUserModule/adminUserAuth.router.js";
import userRoutes from "./userModule/user.route.js"

const router = Router();
router.use("/assets", AssetUploadRoutes);
router.use("/adminUser",adminUserRoutes);
router.use("/user",userRoutes);


export default router;

