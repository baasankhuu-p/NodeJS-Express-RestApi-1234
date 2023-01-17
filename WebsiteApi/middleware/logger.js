const color = require('colors');
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.protocol}://${req.host}${req.originalUrl}`.blue.bold.underline);
  next();
};

module.exports = logger;
