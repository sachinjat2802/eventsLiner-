import { Router } from "express";
import AddOnSellerController from "./AddOnSeller.controller.js";

const router = Router();

router.post("/createAddOnSeller", AddOnSellerController.createAddOnSeller);


router.put("/updateAddOnSeller/:id",AddOnSellerController.updateAddOnSeller);

router.delete("/deleteAddOnSeller/:id",  AddOnSellerController.deleteAddOnSeller);

router.get("/getAddOnSellers", AddOnSellerController.getAddOnSellers);

router.get("/getAddOnSellersWithOrganization/:id",AddOnSellerController.getAddOnSellers)


export default router;