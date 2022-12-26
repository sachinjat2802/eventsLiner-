import { Router } from "express";
//import UserController from "./adminUserAuth.controller.js";
import userController from "./User.controller.js";
const router = Router();



router.get("/getUser", userController.getUser);
router.put("/updateUser", userController.updateUser)
router.get("/getAllUsers", userController.getAllUsers)
router.delete("/removeUser/:id", userController.removeUser)
router.get("/addToFavourites/:id", userController.addToFavourites)
router.get("/removeFromFavourites/:venueId", userController.removeFromFavourites)
router.get("/getAllFavourites", userController.getAllFavourites)


//router.post("/resetPasswordThroughLink", AdminUserController.changePasswordThroughLink);


export default router;