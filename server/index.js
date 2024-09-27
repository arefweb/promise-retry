const app = require("./app");

const PORT = 8633;

app.listen(PORT, () => {
  console.log(`API Server is running on: http://localhost:${PORT}`);
});
