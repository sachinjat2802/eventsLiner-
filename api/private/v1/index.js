import { Router } from "express";


import userRoutes from "./UserModule/user.router.js";
import userSearchRoutes from "./UserSearchModule/user.router.js";
import organizationServiceRoutes from "./OrganizationModule/Organization.router.js";
import venueRoutes from "./venueModule/venue.router.js";
import venueMenuRoutes from "./VenueMenuModule/VenueMenu.router.js"
import venueReviewRoutes from "./VenueReviewModule/VenueReview.router.js";
import venuePhotoRoutes from "./VenuePhotosModule/VenuePhoto.router.js";
import venueSlotsRoutes from "./VenueSlotsModule/VenueSlots.router.js";
import venueBookingRoutes from "./VenueBookingModule/VenueBooking.router.js";

import venuePackageRoutes from "./VenuePackageModule/VenuePackage.router.js"

import venueVisitHistoryRoutes from "./VenueVisitHistoryModule/VenueVisitHistory.router.js"
import addOnSellerRoutes from "./addOnSellerModule/AddOnSeller.router.js";
import addOnSellerPhotosRoutes from "./AddOnSellerPhotosModule/AddOnSellerPhotos.router.js";
import addOnSellerProductPhotoRoutes from "./AddOnSellerProductPhotosModule/AddOnSellerProductPhotos.router.js"
import addOnSellerProductRoutes from "./AddOnSellerProductModule/addOnSellerProduct.router.js"
import addOnSellerReviewRoutes from "./AddOnSellerReviewModule/addOnSellerReview.router.js"
import addOnProductOrderRoutes from "./AddOnProductOrderModule/AddOnProductOrder.router.js"
import addOnProductCartRoutes from "./AddOnProductCartModule/AddOnProductCart.router.js";
import eventManagerRoutes from "./EventManagerModule/EventManager.router.js"
import eventRoutes from  "./EventModule/EventModule.router.js"
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
router.use("/venueVisitHistory",venueVisitHistoryRoutes)

router.use("/addOnSeller", addOnSellerRoutes)
router.use("/addOnSellerPhotos", addOnSellerPhotosRoutes)
router.use("/addOnSellerProduct", addOnSellerProductRoutes)
router.use("/addOnSellerProductPhoto", addOnSellerProductPhotoRoutes)
router.use("/addOnProductsCart",addOnProductCartRoutes)
router.use("/addOnProductOrder",addOnProductOrderRoutes)
router.use("/addOnSellerReview", addOnSellerReviewRoutes)

router.use("/eventManager",eventManagerRoutes)
router.use("/event", eventRoutes)




export default router;