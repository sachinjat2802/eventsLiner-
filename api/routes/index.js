import publicV1APIs from "../public/index.js";
import adminPrivateV1APIs from "../admin/index.js";
import privateV1APIs from "../private/index.js";
import { requireAuth, verifyTokenAdmin, verifyTokenClient } from "../../middleware/index.js";

const initializeAPIs = (app) => {
  app.use("/public", publicV1APIs);
  app.use("/private", verifyTokenClient, requireAuth, privateV1APIs);
  app.use("/admin/private", verifyTokenAdmin, requireAuth, adminPrivateV1APIs);
};

export default initializeAPIs;
