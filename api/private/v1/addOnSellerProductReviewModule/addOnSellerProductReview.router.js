import { Router } from "express";
import ProductReviewsController from "./addOnSellerProductReview.controller.js";

const router = Router();

router.post("/createProductReviews/:id", ProductReviewsController.createProductReviews);

router.put("/changeProductReviews/:id",ProductReviewsController.updateProductReviews);

router.delete("/deleteProductReviews/:id",  ProductReviewsController.deleteProductReviews);

router.get("/getProductReviews", ProductReviewsController.getProductReviews);


export default router;