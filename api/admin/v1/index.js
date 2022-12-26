import { Router } from "express";



import adminUserRoutes from "./AdminUserModule/adminUserAuth.router.js";
import customerRoutes from "./userModule/user.router.js";
import userSearchRoutes from "./userSearchModule/user.router.js";
import organizationServiceRoutes from "./OrganizationModule/Organization.router.js";
import venuePackageRoutes from "./VenuePackageModule/VenuePackage.router.js"

import venueRoutes from "./VenueModule/venue.router.js";
import venueVisitHistoryRoutes from "./VenueVisitHistoryModule/VenueVisitHistory.router.js"
import addOnSellerRoutes from "./AddOnSellerModule/AddOnSeller.router.js";
import commissionRoutes from "./CommissionModule/Commission.router.js";
import taxRoutes from "./TaxModule/Tax.router.js"
const router = Router();






router.use("/adminUser",adminUserRoutes);
router.use("/customer",customerRoutes);
router.use("/userSearch",userSearchRoutes)
router.use("/organizations",organizationServiceRoutes)
router.use("/venue",venueRoutes)
router.use("/venuePackage",venuePackageRoutes)
router.use("/venueVisitHistory",venueVisitHistoryRoutes)
router.use("/addOnSeller", addOnSellerRoutes)
router.use("/commission",commissionRoutes)
router.use("/tax",taxRoutes)





export default router;

