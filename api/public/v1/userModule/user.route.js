import { Router } from "express";
//import UserController from "./adminUserAuth.controller.js";
import userController from "./user.controller.js";
const router = Router();

router.post("/createUser", userController.createUser ); 
router.post("/signin", userController.signIn);
router.get("/getUser", userController.getUser);
//router.post("/resetPasswordThroughLink", AdminUserController.changePasswordThroughLink);

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));
router.get('/auth/google/redirect', passport.authenticate('google', { session: false, failureRedirect: `https://localhost:8000/login` }), (req, res) => {
  res.redirect(req.user); //req.user has the redirection_url
});

// Microsoft Routes
router.get('/auth/microsoft', passport.authenticate('microsoft', { session: false }));
router.get('/auth/microsoft/redirect', passport.authenticate('microsoft', { session: false, failureRedirect: `https://localhost:8000/login` }), (req, res) => {
  res.redirect(req.user);
});
export default router;