import { Router } from "express";


import userRoutes from "./userModule/user.router.js";
import userSearchRoutes from "./userSearchModule/user.router.js";
import organizationServiceRoutes from "./OrganizationModule/Organization.router.js";
import venueRoutes from "./venueModule/venue.router.js";
import venueMenuRoutes from "./VenueMenuModule/VenueMenu.router.js"
import venueReviewRoutes from "./VenueReviewModule/VenueReview.router.js";


const router = Router();

router.use("/user", userRoutes)
router.use("/organizations",organizationServiceRoutes)
router.use("/userSearch",userSearchRoutes)
router.use("/venue",venueRoutes)
router.use("/venueMenu",venueMenuRoutes)
router.use("/venueReview",venueReviewRoutes)









export default router;

