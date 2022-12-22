import { Router } from "express";
import AddOnSellerPhotoController from "./AddOnSellerPhotos.controller.js";

const router = Router();

router.post("/createAddOnSellerPhoto", AddOnSellerPhotoController.createAddOnSellerPhoto);

router.put("/replacePhotos/:id",AddOnSellerPhotoController.updateAddOnSellerPhoto);

router.delete("/deleteAddOnSellerPhoto/:id",  AddOnSellerPhotoController.deleteAddOnSellerPhoto);

router.get("/getAddOnSellerPhoto/:id", AddOnSellerPhotoController.getAddOnSellerPhotos);


export default router;