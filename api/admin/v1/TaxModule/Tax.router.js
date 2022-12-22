import { Router } from "express";
import TaxController from "./Tax.controller.js";

const router = Router();

router.post("/createTax", TaxController.createTax);

router.put("/updateTax/:id",TaxController.updateTax);

router.delete("/deleteTax/:id",  TaxController.deleteTax);

router.get("/getTax", TaxController.getMyTax);

router.get('/getTaxByUid/:id', TaxController.getTaxByUid);


export default router;