import { Router } from "express";
import AddOnProductCartController from "./AddOnProductCart.controller.js";

const router = Router();

router.post("/createAddOnProductCart", AddOnProductCartController.createAddOnProductCart);

router.put("/updateAddOnProductCart/:id",AddOnProductCartController.updateAddOnProductCart);

router.delete("/deleteAddOnProductCart/:id",  AddOnProductCartController.deleteAddOnProductCart);

router.get("/getAddOnProductCartByVenueId/:id", AddOnProductCartController.getMyAddOnProductCart);

router.get("/getAddOnProductCart", AddOnProductCartController.getAddOnProductCart);

router.get("/getAddOnProductCartwithUserId/:userId", AddOnProductCartController.getAddOnProductCart);


// router.get('/getAddOnProductCartByUid/:id', AddOnProductCartController.getAddOnProductCartByUid);


export default router;