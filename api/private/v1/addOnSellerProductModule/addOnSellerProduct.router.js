import { Router } from "express";
import AddOnSellerProductController from "./addOnSellerProduct.controller.js";

const router = Router();

router.post("/createAddOnSellerProduct/:id", AddOnSellerProductController.createAddOnSellerProduct);

router.put("/updateAddOnSellerProduct/:id",AddOnSellerProductController.updateAddOnSellerProduct);

router.delete("/deleteAddOnSellerProduct/:id",  AddOnSellerProductController.deleteAddOnSellerProduct);

router.get("/getAddOnSellerProductByVenueId/:id", AddOnSellerProductController.getMyAddOnSellerProduct);

router.get("/getAddOnSellerProduct/:id", AddOnSellerProductController.getAddOnSellerProduct);

router.get("/getAddOnSellerProductBySellerId/:addOnSellerId", AddOnSellerProductController.getAddOnSellerProduct)

//router.get("/getAddOnSellerProductwithUserId/:userId", AddOnSellerProductController.getAddOnSellerProduct);


// router.get('/getAddOnSellerProductByUid/:id', AddOnSellerProductController.getAddOnSellerProductByUid);


export default router;