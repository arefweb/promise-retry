
const getAppName = (req, res) => {
  const shouldReturnError = req.headers["x-custom"];
  const result = {
    appName: "Vite + React",
  };
  if (!shouldReturnError) {
    res.json(result);
  } else {
    res.status(500).send(`Server Error`);
  }
};

module.exports = getAppName;
