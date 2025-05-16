const { sendEmail } = require("./utils/mailer");
const cron = require("node-cron");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Bike = require("./models/Bike");
const Finance = require("./models/Finance");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Cron job connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));

cron.schedule("0 9 * * *", async () => {
  console.log("⏰ Running daily bike & finance check...");

  const now = new Date();
  const bikes = await Bike.find({ status: "active" });

  for (let bike of bikes) {
    const ageInMonths =
      (now.getFullYear() - bike.purchaseDate.getFullYear()) * 12 +
      (now.getMonth() - bike.purchaseDate.getMonth());

    if (ageInMonths >= 24) {
      bike.status = "gifted";
      await bike.save();
      console.log(`🎁 Bike ${bike.bikeNumber} gifted (24+ months)`);
      sendEmail("Bike Gifted", `Bike ${bike.bikeNumber} was gifted (24+ months old).`);
    }
  }

  // Check savings
  const reports = await Finance.find().sort({ month: 1 });
  if (reports.length > 0) {
    const latest = reports[reports.length - 1];
    if (latest.savings >= 18000) {
      console.log(`🚲 You can afford a new bike! Savings: R${latest.savings}`);
      sendEmail("Bike Purchase Alert", `You can afford a new bike! Savings: R${latest.savings}`);
    }
  }
});
