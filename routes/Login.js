const express = require("express");
require("../db/mongoose");
const router = express.Router();
const auth = require("../middleware/auth");
const login = require("../controllers/Login");
router.post("/login", login);

module.exports = router;
