const express = require("express");
const cors = require("cors");

const transactionsRoutes = require("./routes/transactions.route");
const appNameRoutes = require("./routes/appName.route");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use(transactionsRoutes);
app.use(appNameRoutes);

module.exports = app;
