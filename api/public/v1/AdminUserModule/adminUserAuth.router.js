import { Router } from "express";
import AdminUserController from "./adminUserAuth.controller.js";
const router = Router();

router.post("/createAdminUser", AdminUserController.createAdminUser); 
router.post("/signin", AdminUserController.signIn);
//router.post("/resetPasswordThroughLink", AdminUserController.changePasswordThroughLink);


export default router;