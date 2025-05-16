const mongoose = require("mongoose");

const bikeSchema = new mongoose.Schema({
  bikeNumber: {
    type: String,
    required: true,
    unique: true
  },
  purchaseDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ["active", "gifted", "expired"],
    default: "active"
  }
});

module.exports = mongoose.model("Bike", bikeSchema);
