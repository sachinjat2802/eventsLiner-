import { Router } from "express";



import adminUserRoutes from "./AdminUserModule/adminUserAuth.router.js";
import customerRoutes from "./userModule/user.router.js";




const router = Router();






router.use("/adminUser",adminUserRoutes);
router.use("/customer",customerRoutes);







export default router;

