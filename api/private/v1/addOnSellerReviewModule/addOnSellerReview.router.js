import { Router } from "express";
import AddOnSellerReviewsController from "./AddOnSellerReview.controller.js";

const router = Router();

router.post("/createAddOnSellerReviews/:id", AddOnSellerReviewsController.createAddOnSellerReviews);

router.put("/changeAddOnSellerReviews/:id",AddOnSellerReviewsController.updateAddOnSellerReviews);

router.delete("/deleteAddOnSellerReviews/:id",  AddOnSellerReviewsController.deleteAddOnSellerReviews);

router.get("/getAddOnSellerReviews", AddOnSellerReviewsController.getAddOnSellerReviews);


export default router;