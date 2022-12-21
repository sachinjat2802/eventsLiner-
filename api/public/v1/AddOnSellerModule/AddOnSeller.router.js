import { Router } from "express";
import AddOnSellerController from "./AddOnSeller.controller.js";

const router = Router();



router.get("/getAddOnSellers", AddOnSellerController.getAddOnSellers);



export default router;