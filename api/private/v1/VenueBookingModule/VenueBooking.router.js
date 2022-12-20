import { Router } from "express";
import VenueBookingController from "./VenueBooking.controller.js";

const router = Router();

router.post("/createVenueBooking/:id", VenueBookingController.createVenueBooking);

router.put("/updateVenueBooking/:id",VenueBookingController.updateVenueBooking);

router.delete("/deleteVenueBooking/:id",  VenueBookingController.deleteVenueBooking);

router.get("/getVenueBookingByVenueId/:id", VenueBookingController.getMyVenueBooking);

router.get("/getVenueBooking/:id", VenueBookingController.getVenueBooking);

router.get("/getVenueBookingwithUserId/:userId", VenueBookingController.getVenueBooking);


// router.get('/getVenueBookingByUid/:id', VenueBookingController.getVenueBookingByUid);


export default router;