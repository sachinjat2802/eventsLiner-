import { Router } from "express";



import adminUserRoutes from "./AdminUserModule/adminUserAuth.router.js";
import customerRoutes from "./userModule/user.router.js";
import userSearchRoutes from "./userSearchModule/user.router.js";




const router = Router();






router.use("/adminUser",adminUserRoutes);
router.use("/customer",customerRoutes);
router.use("/userSearch",userSearchRoutes)







export default router;

