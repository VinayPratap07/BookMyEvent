const { Router } = require("express");
const {
  getUser,
  registerUser,
  loginUser,
} = require("../Controller/User.Auth.Controller");

const router = Router();

router.get("/me", getUser);
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
