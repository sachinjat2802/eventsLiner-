import { Router } from "express";
import AssetUploadRoutes from "./AssetsModule/assets.router.js";
import adminUserRoutes from "./AdminUserModule/adminUserAuth.router.js";
import userRoutes from "./userModule/user.route.js"
import venueRoutes from "./venueModule/venue.router.js"

const router = Router();
router.use("/assets", AssetUploadRoutes);
router.use("/adminUser",adminUserRoutes);
router.use("/user",userRoutes);
router.use("/venues",venueRoutes);


export default router;

