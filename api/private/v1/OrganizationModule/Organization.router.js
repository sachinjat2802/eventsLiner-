import { Router } from "express";
import OrganizationController from "./Organization.controller.js";

const router = Router();

router.post("/createOrganization", OrganizationController.createOrganization);

router.put("/updateOrganization/:id",OrganizationController.updateOrganization);

router.delete("/deleteOrganization/:id",  OrganizationController.deleteOrganization);

router.get("/getOrganizations", OrganizationController.getOrganizations);


export default router;