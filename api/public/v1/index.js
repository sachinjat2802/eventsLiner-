import { Router } from "express";
import AssetUploadRoutes from "./AssetsModule/assets.router.js";
import adminUserRoutes from "./AdminUserModule/adminUserAuth.router.js";
import userRoutes from "./userModule/user.route.js"
//import venueRoutes from "./venueModule/Venue.router.js"
import addOnSellerRoutes from "./addOnSellerModule/AddOnSeller.router.js";

const router = Router();
router.use("/assets", AssetUploadRoutes);
router.use("/adminUser",adminUserRoutes);
router.use("/user",userRoutes);
//router.use("/venues",venueRoutes);
router.use("/addOnSeller", addOnSellerRoutes)


export default router;

