const { transactions } = require("../models/transactions");

const getTransactions = (req, res) => {
  const shouldReturnError = req.headers["x-custom"];
  const result = {
    totalCount: transactions.length,
    transactions: transactions,
  };
  if (!shouldReturnError) {
    res.json(result);
  } else {
    res.status(500).send(`Server Error`);
  }
};

module.exports = getTransactions;
