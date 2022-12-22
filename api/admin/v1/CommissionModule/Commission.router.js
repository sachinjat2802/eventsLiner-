import { Router } from "express";
import CommissionController from "./Commission.controller.js";

const router = Router();

router.post("/createCommission", CommissionController.createCommission);

router.put("/updateCommission/:id",CommissionController.updateCommission);

router.delete("/deleteCommission/:id",  CommissionController.deleteCommission);

router.get("/getCommission", CommissionController.getMyCommission);

router.get('/getCommissionByUid/:id', CommissionController.getCommissionByUid);


export default router;