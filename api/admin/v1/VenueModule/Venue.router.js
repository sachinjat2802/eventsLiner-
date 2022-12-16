import { Router } from "express";
import VenueController from "./Venue.controller.js";

const router = Router();

router.post("/postMultipeVenue",VenueController.postMultipeVenue)
router.put("/updateVenue/:id",VenueController.updateVenue);
router.delete("/deleteVenue/:id",  VenueController.deleteVenue);
router.get("/getVenues", VenueController.getVenues);


export default router;