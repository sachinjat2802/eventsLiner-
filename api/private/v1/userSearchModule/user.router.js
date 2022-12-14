import { Router } from "express";
import userController from "./user.controller.js";
const router = Router();



router.post("/search/:id", userController.search);




export default router;