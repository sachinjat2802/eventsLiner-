
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
  
passport.serializeUser((user , done) => {
    done(null , user);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
});
  
passport.use(new GoogleStrategy({
    clientID:"YOUR ID", // Your Credentials here.
    clientSecret:"YOUR SECRET", // Your Credentials here.
    callbackURL:"http://localhost:4000/auth/callback",
    passReqToCallback:true
  },
  function(request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));