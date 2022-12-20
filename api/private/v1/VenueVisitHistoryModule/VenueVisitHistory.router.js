import { Router } from "express";
import VenueVisitHistoryController from "./VenueVisitHistory.controller.js";

const router = Router();

router.get("/createVenueVisitHistory/:id", VenueVisitHistoryController.createVenueVisitHistory);



router.get("/getVenueVisitHistory/:id", VenueVisitHistoryController.getMyVenueVisitHistory);

router.get('/getVenueVisitHistoryByUid/:userId', VenueVisitHistoryController.getVenueVisitHistoryByUid);


export default router;