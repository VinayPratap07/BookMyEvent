const { Router } = require("express");
const {
  getUser,
  registerUser,
  loginUser,
} = require("../Controller/User.Auth.Controller");
const validateSignup = require("../Middleware/signup.middleware");

const router = Router();

router.get("/me", getUser);
router.post("/register", validateSignup, registerUser);
router.post("/login", loginUser);

module.exports = router;
