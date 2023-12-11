const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const configureAuthMiddleware = (server) => {
  server.use(
    express.urlencoded({ extended: true, limit: "50mb" }),
    express.json({ limit: "50mb" })
  );
  server.use(cookieParser());
  server.use(morgan("dev"));
  server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

    if (req.method === "OPTIONS") {
      res.sendStatus(200);
    } else {
      next();
    }
  });
};

module.exports = configureAuthMiddleware;
