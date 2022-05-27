const express = require("express");
require("../db/mongoose");
const cors = require("cors");

const postUser = require("../controllers/User");
const router = express.Router();
router.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
router.post("/signup", cors(), postUser);

module.exports = router;
