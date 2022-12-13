import { Router } from "express";



import adminUserRoutes from "./AdminUserModule/adminUserAuth.router.js";




const router = Router();






router.use("/adminUser",adminUserRoutes);







export default router;

