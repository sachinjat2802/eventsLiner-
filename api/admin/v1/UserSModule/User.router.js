import { Router } from "express";
//import UserController from "./adminUserAuth.controller.js";
import userController from "./User.controller.js";
const router = Router();

router.get("/getCustomer/:id",userController.getUser)
router.put("/updateCustomer/:id", userController.updateUser)
router.get("/getAllCustomer", userController.getAllUsers)
router.delete("/removeCustomer/:id", userController.removeUser)


export default router;