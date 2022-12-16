import { Router } from "express";



import adminUserRoutes from "./AdminUserModule/adminUserAuth.router.js";
import customerRoutes from "./userModule/user.router.js";
import userSearchRoutes from "./userSearchModule/user.router.js";
import organizationServiceRoutes from "./OrganizationModule/Organization.router.js";

import venueRoutes from "./venueModule/venue.router.js";



const router = Router();






router.use("/adminUser",adminUserRoutes);
router.use("/customer",customerRoutes);
router.use("/userSearch",userSearchRoutes)
router.use("/organizations",organizationServiceRoutes)
router.use("/venue",venueRoutes)







export default router;

