import { Router } from "express";



import adminUserRoutes from "./AdminUserModule/AdminUsersAuth.router.js";
import customerRoutes from "./UserSModule/User.router.js";
import userSearchRoutes from "./UsersSearchModule/User.router.js";
import organizationServiceRoutes from "./OrganizationModule/Organization.router.js";
import venuePackageRoutes from "./VenuePackageModule/VenuePackage.router.js"

import venueRoutes from "./VenueModule/Venue.router.js";
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

