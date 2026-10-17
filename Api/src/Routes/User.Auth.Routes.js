const { Router } = require("express");
const {
  getCurrUser,
  registerUser,
  loginUser,
} = require("../Controller/User.Auth.Controller");
const validateSignup = require("../Middleware/signup.middleware");
const validateLogin = require("../Middleware/login.middleware");

const router = Router();

router.get("/me", getCurrUser);
router.post("/register", validateSignup, registerUser);
router.post("/login", validateLogin, loginUser);

module.exports = router;
