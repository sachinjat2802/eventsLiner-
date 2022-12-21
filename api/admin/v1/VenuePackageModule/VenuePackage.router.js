import { Router } from "express";
import VenuePackageController from "./VenuePackage.controller.js";

const router = Router();

// router.post("/createVenuePackage/:id", VenuePackageController.createVenuePackage);

router.put("/updateVenuePackage/:id",VenuePackageController.updateVenuePackage);

router.delete("/deleteVenuePackage/:id",  VenuePackageController.deleteVenuePackage);

// router.get("/getVenuePackageByVenueId/:id", VenuePackageController.getMyVenuePackage);

router.get("/getVenuePackage", VenuePackageController.getVenuePackage);

// router.get("/getVenuePackagewithUserId/:userId", VenuePackageController.getVenuePackage);


// router.get('/getVenuePackageByUid/:id', VenuePackageController.getVenuePackageByUid);


export default router;