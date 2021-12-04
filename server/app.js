// import variable environment from dev environment
require("custom-env").env("dev");
// import dependencies
const log4js = require('log4js');
const express = require("express");
const path = require("path");
// const logger = require("morgan");
const log = log4js.getLogger("app");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const eurekaHelper = require("./eureka-helper");
const cors = require('cors')

//  use this for connect mongodb with an app
// const mongoClient = require('mongodb').MongoClient;

// create application object
const app = express();

const teamRoute = require("./routes/API/team");

const userRoutes = require("./routes/API/users");

const profileRoutes = require("./routes/API/profiles");

const requestingRoutes = require("./routes/API/requests");

const companyRoute = require("./routes/API/companys");

// passport config
require("./config/passport")(passport);
// middleware
// passport middle ware

app.use(passport.initialize());
// path to HTML file
app.use("/", express.static("public"));
app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' }));
app.use(cors())
// PASS COOKIES from HTTP
app.use(cookieParser());
// parsing JSON format
app.use(express.json());
// Body parser
app.use(express.urlencoded({ extended: true }));
eurekaHelper.registerWithEureka("user-service", process.env.SERVER_PORT);

// connect user route
app.use("/v1", teamRoute);
app.use("/v1/user", userRoutes);
app.get("/", (req, res) => {
  res.json("I am user-service");
});

app.use("/v1/profile", profileRoutes);

app.use("/v1/requesting", requestingRoutes);

app.use("/v1/company", companyRoute);

app.use("/uploads", express.static("uploads"));
// eslint-disable-next-line consistent-return

// if error first, it will response with status 500
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
// if error first, it will response with status 500

const mongodb = process.env.MONGODB || "localhost";
mongoose.connect(`mongodb://${mongodb}:${process.env.DB_PORT}/cmpt353db`);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
  console.log(
    `Connected to mongodb successfully!\n\n uri: ${process.env.HOST}:${process.env.DB_PORT}`
  );
});

module.exports = app;
