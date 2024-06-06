// const logger = require("../utils/logger");

module.exports = (err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode).json({ message: "an error occurred", err });
};
