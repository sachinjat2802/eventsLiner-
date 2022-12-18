import { Router } from "express";
import VenueReviewsController from "./VenueReview.controller.js";

const router = Router();

router.post("/createVenueReviews/:id", VenueReviewsController.createVenueReviews);

router.put("/changeVenueReviews/:id",VenueReviewsController.updateVenueReviews);

router.delete("/deleteVenueReviews/:id",  VenueReviewsController.deleteVenueReviews);

router.get("/getVenueReviews/:id", VenueReviewsController.getMyVenueReviews);

router.get('/getVenueReviewsByUid/:id', VenueReviewsController.getVenueReviewsByUid);


export default router;