import { Router } from "express";
import VenueMenusController from "./VenueMenu.controller.js";

const router = Router();

router.post("/createVenueMenus", VenueMenusController.createVenueMenus);

router.put("/updateVenueMenus/:id",VenueMenusController.updateVenueMenus);

router.delete("/deleteVenueMenus/:id",  VenueMenusController.deleteVenueMenus);

router.get("/getVenueMenus", VenueMenusController.getVenueMenus);


export default router;