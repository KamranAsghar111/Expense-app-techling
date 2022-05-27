const mongoose = require("mongoose");
const budgetSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },

  expense: {
    type: Number,
    default: 0,
  },
  earning: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    default: 0,
  },
  amountType: {
    type: String,
  },
  name: {
    type: String,
  },

  TotalBudget: {
    type: Number,
  },
  User: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});
const budget = new mongoose.model("budget", budgetSchema);
module.exports = budget;
