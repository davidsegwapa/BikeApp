const mongoose = require("mongoose");

const financeSchema = new mongoose.Schema({
  month: {
    type: String, // e.g., "2025-05"
    required: true,
    unique: true
  },
  income: {
    type: Number,
    required: true
  },
  expenses: {
    type: Number,
    required: true
  },
  savings: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Finance", financeSchema);
