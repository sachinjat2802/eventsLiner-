import { Router } from "express";
//import UserController from "./adminUserAuth.controller.js";
import userController from "./User.controller.js";
// import passport from "passport";
// import strategy from "passport-google-oauth20";
// import facebookStrategy from "passport-facebook";
import dotenv from "dotenv";
import process from "node:process"
// import logger from "../../../../logger/logger.js"
dotenv.config({ silent: process.env });

// const GoogleStrategy = strategy.Strategy;
// const FacebookStrategy = facebookStrategy.Strategy;





const router = Router();

// passport.serializeUser((user, cb) => {
//     cb(null, user);
//   });
//   passport.deserializeUser((user, cb) => {
//     cb(null, user);
//   });

//   let users = {};

//   passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE.GOOGLE_CLIENT_SECRET,
//     callbackURL: "/public/api/v1/auth/google/callback",
//     passReqToCallback: true,
//     proxy: true
//   }, (request, accessToken, refreshToken, profile, cb) => {
//     const user = {
//       id: profile.id,
//       name: profile.displayName,
//       email: profile.emails !== undefined || null ? profile.emails[0].value : null,
//       profilePicture: profile.photos[0].value
//     };
//     const state = JSON.parse(request.query.state);
//     userController.socialSignIn(user, "Google", state, (err, user) => {
//       if (err) {
//         return cb(null, err);
//       } else {
//         users = { ...user };
//         return cb(null, users);
//       }
//     });
//   }));

//   passport.use(new FacebookStrategy({
//     clientID: process.env.FACEBOOK.FACEBOOK_CLIENT_ID,
//     clientSecret: process.env.FACEBOOK.FACEBOOK_CLIENT_SECRET,
//     callbackURL: "/public/api/v1/auth/facebook/callback",
//     passReqToCallback: true,
//     profileFields: ["id", "emails", "first_name", "last_name", "displayName", "link", "picture"]
//   }, (request, accessToken, refreshToken, profile, cb) => {
//     const user = {
//       id: profile.id,
//       name: profile.displayName,
//       email: profile.emails !== undefined || null ? profile.emails[0].value : null,
//       profilePicture: profile.photos[0].value
//     };
//     const state = JSON.parse(request.query.state);
//     userController.socialSignIn(user, "Facebook", state, (err, user) => {
//       if (err) {
//         logger.error("SocialSignInError=>", err);
//         return cb(null, err);
//       } else {
//         users = { ...user };
//         logger.error("SocialSignIn Users=>", users);
//         return cb(null, users);
//       }
//     });
//   }));


// Google
// router.get("/google",
//   (request, response) => {
//     passport.authenticate("google", {
//       scope: ["profile", "email"],
//       state: JSON.stringify(request.query),
//     })(request, response);
//   }
// );

// router.get("/google/callback", passport.authenticate("google", { failureRedirect: `${process.env.redirectUrl}}?_id=400` }),
//   (req, res) => {
//     res.redirect(`${process.env.redirectSuccessUrl}`)
//   });

//   router.get("/facebook", (request, response) => {
//     logger.info("state", request.query);
//     passport.authenticate("facebook", {
//       scope: ["email"],
//       state: JSON.stringify(request.query),
//     })(request, response);
//   });
  
  
//   router.get("/facebook/callback",
//     passport.authenticate("facebook", { failureRedirect: `${process.env.redirectUrl}}?_id=400` }),
//     (req, res) => {
//         res.redirect(`${process.env.redirectSuccessUrl}`)
//       });



  

router.post("/createUser", userController.createUser ); 
router.post("/signIn", userController.signIn);
router.get("/getUser", userController.getUser);

//router.post("/resetPasswordThroughLink", AdminUserController.changePasswordThroughLink);


export default router;