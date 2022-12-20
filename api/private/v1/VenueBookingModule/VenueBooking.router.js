import { Router } from "express";
import VenueBookingController from "./VenueBooking.controller.js";

const router = Router();

router.post("/createVenueBooking/:id", VenueBookingController.createVenueBooking);

router.put("/changeVenueBooking/:id",VenueBookingController.updateVenueBooking);

router.delete("/deleteVenueBooking/:id",  VenueBookingController.deleteVenueBooking);

router.get("/getVenueBooking/:id", VenueBookingController.getMyVenueBooking);

router.get('/getVenueBookingByUid/:id', VenueBookingController.getVenueBookingByUid);


export default router;