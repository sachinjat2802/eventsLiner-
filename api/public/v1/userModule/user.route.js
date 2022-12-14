import { Router } from "express";
//import UserController from "./adminUserAuth.controller.js";
import userController from "./user.controller.js";
const router = Router();

router.post("/createUser", userController.createUser ); 
router.post("/signIn", userController.signIn);
router.get("/getUser", userController.getUser);

//router.post("/resetPasswordThroughLink", AdminUserController.changePasswordThroughLink);


export default router;