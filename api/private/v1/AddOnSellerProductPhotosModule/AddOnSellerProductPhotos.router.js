import { Router } from "express";
import AddOnSellerProductPhotoController from "./AddOnSellerProductPhotos.controller.js";

const router = Router();

router.post("/createAddOnSellerProductPhoto", AddOnSellerProductPhotoController.createAddOnSellerProductPhoto);

router.put("/replacePhotos/:id",AddOnSellerProductPhotoController.updateAddOnSellerProductPhoto);

router.delete("/deleteAddOnSellerProductPhoto/:id",  AddOnSellerProductPhotoController.deleteAddOnSellerProductPhoto);

router.get("/getAddOnSellerProductPhoto/:id", AddOnSellerProductPhotoController.getAddOnSellerProductPhotos);


export default router;