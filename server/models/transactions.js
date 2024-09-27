const transactions = Array.from({ length: 13 }, (_, id) => ({
  id: id + 1,
  first_name: "John",
  last_name: "Doe",
  price: Math.floor(Math.random() * 10000) + 1,
  date: new Date().toISOString(),
}));

module.exports = { transactions };
