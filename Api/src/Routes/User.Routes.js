const { Router } = require("express");
const { getUser, registerUser } = require("../Controller/User.Controller");

const router = Router();

router.get("/me", getUser);
router.post("/register", registerUser);

module.exports = router;
