import { Router } from "express";
//import UserController from "./adminUserAuth.controller.js";
import logger from "../../../../logger/logger.js"
import userController from "./user.controller.js";
const router = Router();



router.get("/getUser", userController.getUser);
router.put("/updateUser", userController.updateUser)
router.get("/getAllUsers", userController.getAllUsers)
router.delete("/removeUser/:id", userController.removeUser)
//router.post("/resetPasswordThroughLink", AdminUserController.changePasswordThroughLink);


export default router;