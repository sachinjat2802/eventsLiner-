import { Router } from "express";
import VenuePhotosController from "./VenuePhoto.controller.js";

const router = Router();

router.post("/createVenuePhotos", VenuePhotosController.createVenuePhotos);

router.put("/replacePhotos/:id",VenuePhotosController.updateVenuePhotos);

router.delete("/deleteVenuePhotos/:id",  VenuePhotosController.deleteVenuePhotos);

router.get("/getVenuePhotos/:id", VenuePhotosController.getVenuePhotoss);


export default router;