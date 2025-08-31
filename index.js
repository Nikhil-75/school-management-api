const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const routes = require("./router/routes");
const config = require("./config/config");

const app = express();
app.use(express.json());

// Serve uploads folder as static
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose.connect(config.dbUri)
  .then(() => console.log("MongoDB connected"))
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

app.use("/api", routes);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
