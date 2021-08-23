const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

const isAuthorized = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).send("User not logged in");
  } else {
    const tokenString = token.split(' ')[1];
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

const isAdmin = async (req, res, next) => {
  req.isAdmin = req.userInfo.roles.includes("admin");
  next();
}

module.exports = { isAuthorized, isAdmin };
