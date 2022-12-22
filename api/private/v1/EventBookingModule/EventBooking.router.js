import { Router } from "express";
import EventBookingController from "./EventBooking.controller.js";

const router = Router();

router.post("/createEventBooking/:id", EventBookingController.createEventBooking);

router.put("/updateEventBooking/:id",EventBookingController.updateEventBooking);

router.delete("/deleteEventBooking/:id",  EventBookingController.deleteEventBooking);

router.get("/getEventBookingByEventId/:id", EventBookingController.getMyEventBooking);

router.get("/getEventBooking/:id", EventBookingController.getEventBooking);

router.get("/getEventBookingwithUserId/:userId", EventBookingController.getEventBooking);


// router.get('/getEventBookingByUid/:id', EventBookingController.getEventBookingByUid);


export default router;