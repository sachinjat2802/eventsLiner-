import { Router } from "express";


import userRoutes from "./userModule/user.router.js";


const router = Router();

router.use("/user", userRoutes)








export default router;

