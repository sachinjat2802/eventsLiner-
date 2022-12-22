import { Router } from "express";
import EventSlotsController from "./EventSlots.controller.js";

const router = Router();

router.post("/createEventSlots/:id", EventSlotsController.createEventSlots);

router.put("/changeEventSlots/:id",EventSlotsController.updateEventSlots);

router.delete("/deleteEventSlots/:id",  EventSlotsController.deleteEventSlots);

router.get("/getEventSlots/:id", EventSlotsController.getMyEventSlots);

router.get('/getEventSlotsByUid/:id', EventSlotsController.getEventSlotsByUid);


export default router;