import { Router } from "express";


import userRoutes from "./userModule/user.router.js";
import userSearchRoutes from "./userSearchModule/user.router.js";


const router = Router();

router.use("/user", userRoutes)

router.use("/userSearch",userSearchRoutes)








export default router;

