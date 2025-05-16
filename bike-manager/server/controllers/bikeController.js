const Finance = require("../models/Finance");

const Bike = require("../models/Bike");

// POST /api/bikes → Add a bike
exports.addBike = async (req, res) => {
  try {
    const { bikeNumber, purchaseDate } = req.body;
    const newBike = new Bike({ bikeNumber, purchaseDate });
    await newBike.save();
    res.status(201).json(newBike);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET /api/bikes → Get all bikes
exports.getBikes = async (req, res) => {
  try {
    const bikes = await Bike.find().sort({ purchaseDate: 1 });
    res.status(200).json(bikes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PATCH /api/bikes/expiry-check → update bike status if 2 years passed
exports.checkAndUpdateBikeStatus = async (req, res) => {
  try {
    const bikes = await Bike.find({ status: "active" });
    const now = new Date();

    for (let bike of bikes) {
      const ageInMonths =
        (now.getFullYear() - bike.purchaseDate.getFullYear()) * 12 +
        (now.getMonth() - bike.purchaseDate.getMonth());

      if (ageInMonths >= 24) {
        bike.status = "gifted";
        await bike.save();
      }
    }

    res.status(200).json({ message: "Bike statuses updated." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/finance → Get financial stats (add this if you have logic for it)
exports.getFinanceStats = async (req, res) => {
  // Implement your logic for financial stats here
  res.status(200).json({ message: "Financial stats not implemented yet." });
};


let totalSavings = 0;
let totalExpenses = 0;

exports.getFinanceStats = async (req, res) => {
  try {
    const activeBikeCount = await Bike.countDocuments({ status: "active" });
    const monthlyIncome = activeBikeCount * 1500;

    // Example logic: Expenses only added manually (later we'll track bike purchases)
    const net = monthlyIncome - totalExpenses;
    totalSavings += net;

    res.status(200).json({
      activeBikes: activeBikeCount,
      monthlyIncome,
      totalExpenses,
      totalSavings
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.recordMonthlyFinance = async (req, res) => {
    try {
      const activeBikeCount = await Bike.countDocuments({ status: "active" });
      const income = activeBikeCount * 1500;
  
      const { expenses = 0 } = req.body;
  
      const now = new Date();
      const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  
      const lastMonth = await Finance.findOne({ month: monthKey });
      const previousSavings = lastMonth ? lastMonth.savings : 0;
  
      const savings = previousSavings + income - expenses;
  
      const summary = await Finance.findOneAndUpdate(
        { month: monthKey },
        { income, expenses, savings },
        { upsert: true, new: true }
      );
  
      res.status(200).json(summary);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.getMonthlyReports = async (req, res) => {
    try {
      const reports = await Finance.find().sort({ month: 1 });
      res.status(200).json(reports);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  