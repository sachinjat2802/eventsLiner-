import { Router } from "express";
import VenueController from "./Venue.controller.js";

const router = Router();

router.post("/createVenue", VenueController.createVenue);

router.put("/updateVenue/:id",VenueController.updateVenue);

router.delete("/deleteVenue/:id",  VenueController.deleteVenue);

router.get("/getVenues", VenueController.getVenues);


export default router;