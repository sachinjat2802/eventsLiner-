import { Router } from "express";


import userRoutes from "./userModule/user.router.js";
import userSearchRoutes from "./userSearchModule/user.router.js";
import organizationServiceRoutes from "./OrganizationModule/Organization.router.js";

const router = Router();

router.use("/user", userRoutes)
router.use("/organizations",organizationServiceRoutes)

router.use("/userSearch",userSearchRoutes)








export default router;

