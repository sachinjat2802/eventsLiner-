import { Router } from "express";
import VenueReviewsController from "./VenueReview.controller.js";

const router = Router();

router.post("/createVenueReviews", VenueReviewsController.createVenueReviews);

router.put("/updateVenueReviews/:id",VenueReviewsController.updateVenueReviews);

router.delete("/deleteVenueReviews/:id",  VenueReviewsController.deleteVenueReviews);

router.get("/getVenueReviews", VenueReviewsController.getVenueReviews);


export default router;