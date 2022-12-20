import { Router } from "express";
import VenueSlotsController from "./VenueSlots.controller.js";

const router = Router();

router.post("/createVenueSlots/:id", VenueSlotsController.createVenueSlots);

router.put("/changeVenueSlots/:id",VenueSlotsController.updateVenueSlots);

router.delete("/deleteVenueSlots/:id",  VenueSlotsController.deleteVenueSlots);

router.get("/getVenueSlots/:id", VenueSlotsController.getMyVenueSlots);

router.get('/getVenueSlotsByUid/:id', VenueSlotsController.getVenueSlotsByUid);


export default router;