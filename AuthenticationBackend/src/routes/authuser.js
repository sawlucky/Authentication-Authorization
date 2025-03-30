const express = require("express");
const router = express.Router();
const {JwtMiddleware} = require("../middlewares/jwtMiddleware")
const {
  HandleSignup,
  HandleUserProfile,
  HandleLogout,
  HandleLogin,
  HandleForgotPassword,
  HandlePassword,
} = require("../controllers/HandleUser");
router.post("/signup", HandleSignup);
router.get("/user", JwtMiddleware, HandleUserProfile);
router.post("/logout", HandleLogout);
router.post("/login", HandleLogin);
router.post("/forgotPassword", HandleForgotPassword)
router.post("/resetPassword",HandlePassword);
module.exports = router;