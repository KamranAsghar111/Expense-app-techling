const express = require("express");
require("../db/mongoose");
const cors=require("cors");


const router = express.Router();
router.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}
));
const Budget = require("../models/Budget");
const auth = require("../middleware/auth");
const {
  postBudget,
  updateBudget,
  getBudget,
  getAllBudget
} = require("../controllers/Budget");
router.get("/budget/get/:id",cors(), auth, getBudget);
// router.get("/budget/get",cors(), auth, getAllBudget);
router.post("/budget/create", cors(),auth, postBudget);
router.patch("/budget/update/:id",cors(), auth, updateBudget);

module.exports = router;
