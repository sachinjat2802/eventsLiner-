import { Router } from "express";


import userRoutes from "./userModule/user.router.js";
import userSearchRoutes from "./userSearchModule/user.router.js";
import organizationServiceRoutes from "./OrganizationModule/Organization.router.js";
import venueRoutes from "./venueModule/venue.router.js";
import venueMenuRoutes from "./VenueMenuModule/VenueMenu.router.js"
import venueReviewRoutes from "./VenueReviewModule/VenueReview.router.js";
import venuePhotoRoutes from "./VenuePhotosModule/VenuePhoto.router.js";
import venueSlotsRoutes from "./VenueSlotsModule/VenueSlots.router.js";
import venueBookingRoutes from "./VenueBookingModule/VenueBooking.router.js";
import venuePackageRoutes from "./VenuePackageModule/VenuePackage.router.js"

const router = Router();

router.use("/user", userRoutes)
router.use("/organizations", organizationServiceRoutes)
router.use("/userSearch", userSearchRoutes)
router.use("/venue", venueRoutes)
router.use("/venuePhoto", venuePhotoRoutes)
router.use("/venueMenu", venueMenuRoutes)
router.use("/venueReview", venueReviewRoutes)
router.use("/venueSlots", venueSlotsRoutes)
router.use("/venueBooking", venueBookingRoutes)
router.use("/venuePackage", venuePackageRoutes)

export default router;










