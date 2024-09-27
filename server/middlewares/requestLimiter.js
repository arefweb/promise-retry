let lastRequestTime = 0;

const requestLimiter = (req, res, next) => {
  const currentTime = Date.now();
  if (currentTime - lastRequestTime < 500) {
    return;
    return res.status(429).send("Too many requests, please try again later.");
  }
  lastRequestTime = currentTime;
  next();
};

module.exports = requestLimiter;
