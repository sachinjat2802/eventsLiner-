import { Router } from "express";
import AddOnProductOrderController from "./AddOnProductOrder.controller.js";

const router = Router();

router.post("/createAddOnProductOrder/:id", AddOnProductOrderController.createAddOnProductOrder);

router.put("/updateAddOnProductOrder/:id",AddOnProductOrderController.updateAddOnProductOrder);

router.delete("/deleteAddOnProductOrder/:id",  AddOnProductOrderController.deleteAddOnProductOrder);

router.get("/getAddOnProductOrderByVenueId/:id", AddOnProductOrderController.getMyAddOnProductOrder);

router.get("/getAddOnProductOrder/:id", AddOnProductOrderController.getAddOnProductOrder);

router.get("/getAddOnProductOrderwithUserId/:userId", AddOnProductOrderController.getAddOnProductOrder);


// router.get('/getAddOnProductOrderByUid/:id', AddOnProductOrderController.getAddOnProductOrderByUid);


export default router;