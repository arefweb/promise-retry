const express = require("express");

const getTransactions = require("../controllers/transactions.controller");
const requestLimiter = require("../middlewares/requestLimiter");

const router = express.Router();

router.get("/api/transactions/", getTransactions);

module.exports = router;
