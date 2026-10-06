const { Router } = require("express");
const { getUser } = require("../Controller/User.Controller");

const router = Router();

router.get("/me", getUser);

module.exports = router;
