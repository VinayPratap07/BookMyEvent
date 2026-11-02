const { Router } = require("express");
const {
  getCurrUser,
  registerUser,
  loginUser,
  logOutUser,
} = require("../Controller/User.Auth.Controller");
const validateSignup = require("../Middleware/signup.middleware");
const validateLogin = require("../Middleware/login.middleware");
const { forceAuthentication } = require("../Middleware/auth.middleware");

const router = Router();

router.get("/me", forceAuthentication, getCurrUser);
router.post("/register", validateSignup, registerUser);
router.post("/login", validateLogin, loginUser);
router.post("/logout", forceAuthentication, logOutUser);

module.exports = router;
