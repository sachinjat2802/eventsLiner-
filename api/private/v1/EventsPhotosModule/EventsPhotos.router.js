import { Router } from "express";
import EventPhotosController from "./EventsPhotos.controller.js";

const router = Router();

router.post("/createEventPhotos", EventPhotosController.createEventPhotos);

router.put("/replacePhotos/:id",EventPhotosController.updateEventPhotos);

router.delete("/deleteEventPhotos/:id",  EventPhotosController.deleteEventPhotos);

router.get("/getEventPhotos/:id", EventPhotosController.getEventPhotoss);


export default router;