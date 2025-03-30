const express = require("express");
const router = express.Router();
const passport = require("passport")
const User= require("../models/user");
const { generateToken } = require("../middlewares/jwtMiddleware");
router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/callback/success",
    failureRedirect: "/auth/callback/failure",
  })
);
router.get("/callback/success", async(req, res) => {
    console.log("this is user:", req.user);
    if (!req.user) return res.redirect("/auth/callback/failure");

    const getUser = await User.findOne({ googleId: req.user });
    if (!getUser) return res.redirect("/auth/callback/failure");
    console.log("user id:", getUser.id, getUser.username, getUser.email);
    const payload = {
        id: getUser._id,
    }
    const token = generateToken(payload);
     res.cookie("token", token, {
       httpOnly: true,
     });
    console.log("google login token",token)
    res.redirect("http://localhost:5173/")
    // res.status(200).send("You have been authenticated successfully");
})

router.get("/callback/failure", (req, res) => {
  res.status(401).json({
    success: false,
    message: "Google Authentication Failed",
  });
});
module.exports = router;