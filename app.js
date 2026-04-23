const express = require("express");
const sequelize = require("./config/db");
require("dotenv").config();

const app = express();
app.use(express.json());

const brandRoutes = require("./routes/brand.routes");
app.use("/api/brands", brandRoutes);

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

sequelize.sync().then(() => {
  console.log("Database connected & tables created");
  app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
  });
});