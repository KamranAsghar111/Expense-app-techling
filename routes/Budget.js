const express = require("express");
require("../db/mongoose");

const router = express.Router();
const Budget = require("../models/Budget");
const auth = require("../middleware/auth");
const {
  postBudget,
  updateBudget,
  getBudget,
} = require("../controllers/Budget");
router.get("/budget/get", auth, getBudget);
router.post("/budget/create", auth, postBudget);

router.patch("/budget/update/:id", auth, updateBudget);

module.exports = router;
