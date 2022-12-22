import { Router } from "express";
import EventController from "./EventModule.controller.js";

const router = Router();

router.post("/createEvent/:id", EventController.createEvent);

router.put("/updateEvent/:id",EventController.updateEvent);

router.delete("/deleteEvent/:id",  EventController.deleteEvent);

router.get("/getEventByEventOrganiserId/:id", EventController.getMyEvent);

router.get("/getEvent/:id", EventController.getEvent);

router.get("/getEvents",EventController.getEvents )

//router.get("/getEventBySellerId/:addOnSellerId", EventController.getEvent)

//router.get("/getEventwithUserId/:userId", EventController.getEvent);


// router.get('/getEventByUid/:id', EventController.getEventByUid);


export default router;