import { Router } from "express";
import EventManagerController from "./EventManager.controller.js";

const router = Router();

router.post("/createEventManager", EventManagerController.createEventManager);


router.put("/updateEventManager/:id",EventManagerController.updateEventManager);

router.delete("/deleteEventManager/:id",  EventManagerController.deleteEventManager);

router.get("/getEventManagers", EventManagerController.getEventManagers);

router.get("/getEventManagersWithOrganization/:id",EventManagerController.getEventManagers)


export default router;