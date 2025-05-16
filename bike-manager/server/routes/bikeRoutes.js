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

// ✅ These paths should be relative to /api/bikes

router.post("/add", addBike); // Final route: /api/bikes/add
router.get("/", getBikes);    // Final route: /api/bikes
router.patch("/expiry-check", checkAndUpdateBikeStatus); // /api/bikes/expiry-check

// Finance routes (if you separate them later, move to /api/finance)
router.get("/finance", getFinanceStats);
router.post("/finance/record", recordMonthlyFinance);
router.get("/finance/reports", getMonthlyReports);

module.exports = router;
