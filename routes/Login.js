const express = require("express");
require("../db/mongoose");
const cors=require("cors");
const router = express.Router();
const auth = require("../middleware/auth");
const login = require("../controllers/Login");
router.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }
  ));
router.post("/login",cors(), login);

module.exports = router;
