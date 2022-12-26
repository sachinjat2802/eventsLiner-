import { Router } from "express";
//import UserController from "./adminUserAuth.controller.js";
import userController from "./User.controller.js";
const router = Router();



router.post("/search", userController.search);




export default router;