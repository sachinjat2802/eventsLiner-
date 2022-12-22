import { Router } from "express";
import AddOnSellerVisitHistoryController from "./AddOnSellerVisitHistory.controller.js";

const router = Router();

router.get("/createAddOnSellerVisitHistory/:id", AddOnSellerVisitHistoryController.createAddOnSellerVisitHistory);

router.get("/getAddOnSellerVisitHistory/:id", AddOnSellerVisitHistoryController.getMyAddOnSellerVisitHistory);

router.get('/getAddOnSellerVisitHistoryByUid/:userId', AddOnSellerVisitHistoryController.getAddOnSellerVisitHistoryByUid);


export default router;