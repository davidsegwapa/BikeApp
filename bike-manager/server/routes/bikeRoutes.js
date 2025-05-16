const express = require("express");
const router = express.Router();

const {
  addBike,
  getBikes,
  checkAndUpdateBikeStatus,
  getFinanceStats,
  recordMonthlyFinance,
  getMonthlyReports,
} = require("../controllers/bikeController");

// ✅ THESE are correct paths:
router.post("/add", addBike); // POST /api/bikes/add
router.get("/", getBikes); // GET /api/bikes
router.patch("/expiry-check", checkAndUpdateBikeStatus); // PATCH /api/bikes/expiry-check
router.get("/finance", getFinanceStats); // GET /api/bikes/finance
router.post("/finance/record", recordMonthlyFinance); // POST /api/bikes/finance/record
router.get("/finance/reports", getMonthlyReports); // GET /api/bikes/finance/reports

module.exports = router;

