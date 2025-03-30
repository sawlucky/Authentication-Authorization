const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
require("dotenv").config();
const User = require("../models/user")
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URI,
    },
    
      async function (accessToken, refreshToken, profile, cb) {
  try {
      console.log(profile);
      const user = {
        googleId: profile.id,
        email: profile.emails[0].value,
        username: profile.displayName,
      };
      console.log(user);
      const getUser = await User.findOne({ googleId: profile.id });
      if (!getUser) {
          const newUser = new User(user);
        await newUser.save();
      }
    return cb(null, profile); 
  } catch (error) {
    return cb(error, null); 
  }
})
);
passport.serializeUser((user, cb) => {
    console.log("saving in the session:", user);
    cb(null, user.id);
})
passport.deserializeUser((user, cb) => {
    cb(null, user);
})
module.exports = passport;