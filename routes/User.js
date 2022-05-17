const express = require("express");
require("../db/mongoose");

const postUser = require("../controllers/User");
const router = express.Router();
router.post("/signup", postUser);

module.exports = router;
