const express = require("express");
const authUserRouter = require("./userAuth");
const cattleRouter = require("./cattleAuth.js");

const V1ROUTER = express.Router();

V1ROUTER.use("/auth", authUserRouter);
V1ROUTER.use("/cattle", cattleRouter);

module.exports = V1ROUTER;
