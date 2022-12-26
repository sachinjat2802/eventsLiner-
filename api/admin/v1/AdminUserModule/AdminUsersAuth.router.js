import { Router } from "express";
import AdminUserController from "./AdminUserAuth.controller.js";
const router = Router();

router.get("/getAdmins", AdminUserController.getAdmins);
router.put("/updateAdminUser", AdminUserController.updateAdminUser);
router.post("/changePassword", AdminUserController.changePassword); 
router.delete("/removeUser/:id", AdminUserController.removeUser); 

export default router;