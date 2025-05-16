const express = require("express");
const router = express.Router();

const {
  addBike,
  getBikes,
  checkAndUpdateBikeStatus,
  getFinanceStats
} = require("../controllers/bikeController");

// Log the imported functions to check if they are defined
console.log({ addBike, getBikes, checkAndUpdateBikeStatus, getFinanceStats });

// Add a new bike
router.post("/bikes", addBike);

// Get all bikes
router.get("/bikes", getBikes);

// Update gifted bikes (24+ months)
router.patch("/bikes/expiry-check", checkAndUpdateBikeStatus);

// Get financial stats
router.get("/finance", getFinanceStats);

module.exports = router;

const { recordMonthlyFinance } = require("../controllers/bikeController");
router.post("/finance/record", recordMonthlyFinance);

const { getMonthlyReports } = require("../controllers/bikeController");
router.get("/finance/reports", getMonthlyReports);

