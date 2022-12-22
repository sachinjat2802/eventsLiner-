import { Router } from "express";
import EventVisitHistoryController from "./EventsVisitHistory.controller.js";

const router = Router();

router.get("/createEventVisitHistory/:id", EventVisitHistoryController.createEventVisitHistory);

router.get("/getEventVisitHistory/:id", EventVisitHistoryController.getMyEventVisitHistory);

router.get('/getEventVisitHistoryByUid/:userId', EventVisitHistoryController.getEventVisitHistoryByUid);


export default router;