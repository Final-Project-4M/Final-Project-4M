const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

const isAuthorized = async (req, res, next) => {
  const tokenString = req.headers.authorization;
  if (!tokenString) {
    res.status(401).send("User not logged in");
  } else {
    jwt.verify(tokenString, jwtSecret, (err, decoded) => {
      if (err || !decoded) {
        res.status(401).send("Login info incorrect");
      } else {
        req.userInfo = decoded;
        next();
      }
    });
  }
}

module.exports = { isAuthorized };
