const jwt = require("jsonwebtoken");

const isAuthJwt = (req, res, next) => {
  let { token } = req.cookies;
  if (token) {
    next();
  } else {
    return res.send(500).send("token not found");
  }
};

module.exports = { isAuthJwt };
