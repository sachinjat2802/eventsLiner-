import { Router } from "express";
import VenuePhotosController from "./VenuePhoto.controller.js";

const router = Router();

router.post("/createVenuePhotos", VenuePhotosController.createVenuePhotos);

router.put("/updateVenuePhotos/:id",VenuePhotosController.updateVenuePhotos);

router.delete("/deleteVenuePhotos/:id",  VenuePhotosController.deleteVenuePhotos);

router.get("/getVenuePhotoss", VenuePhotosController.getVenuePhotos);


export default router;