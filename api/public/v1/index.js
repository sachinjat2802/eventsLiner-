import { Router } from "express";
import AssetUploadRoutes from "./AssetModule/Assets.router.js";
import adminUserRoutes from "./AdminsUserModule/AdminUserAuth.router.js";
import userRoutes from "./UsersModule/User.route.js"
import venueRoutes from "./VenueModule/Venue.router.js"
import addOnSellerRoutes from "./AddOnSellerModule/AddOnSeller.router.js";

const router = Router();
router.use("/assets", AssetUploadRoutes);
router.use("/adminUser",adminUserRoutes);
router.use("/user",userRoutes);
router.use("/venues",venueRoutes);
router.use("/addOnSeller", addOnSellerRoutes)


export default router;

