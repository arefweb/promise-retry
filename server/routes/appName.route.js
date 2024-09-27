const express = require("express");

const getAppName = require("../controllers/appname.controller");
const requestLimiter = require("../middlewares/requestLimiter");

const router = express.Router();

router.get("/api/app-name/", getAppName);

module.exports = router;
