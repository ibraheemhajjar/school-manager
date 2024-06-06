//package imports
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

//local imports
const newsRoutes = require("./routes/news");
// const logger = require('./utils/logger');
const errorHandler = require("./middleware/error-handler");

//environment variables
const port = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI;

//main application
const app = express();
app.use(express.json());

// enabling cross-origin resources
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type",
    "Authorization"
  );
  next();
});

//routes
app.use("/", newsRoutes);

// error handler
app.use(errorHandler);

//database connection
mongoose.connect(DB_URI, () => {
  console.log("database connected successfully!");

  app.listen(port, () => {
    console.log(`server started at port: ${port}`);
  });
});
