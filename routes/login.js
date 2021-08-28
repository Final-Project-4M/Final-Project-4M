const { Router } = require('express');
const router = Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userDao = require('../daos/user');
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;
const { isAuthorized } = require('../middleware/auth');
const { errorHandler } = require('../middleware/error');

// Signup: POST /login/signup
router.post("/signup", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || password === '') {
    res.status(400).send("Incomplete signup info");
  } else {
    try {
      const user = await userDao.getUser(email);
      if (user) {
        res.status(409).send("An account with this email exists");
      } else {
        let encryptedPassword = await bcrypt.hash(password, 10);
        let signupObject = ({ email, password: encryptedPassword });
        let createdAccount = await userDao.createUser(signupObject);
        createdAccount = createdAccount.toObject();
        delete createdAccount.password;
        res.json(createdAccount);
      }
    } catch (e) {
      next(e);
    }
  }
});

// Login: POST /login
router.post("/", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || email === '') {
    res.status(401).send("Email required");
  } else {
    try {
      const user = await userDao.getUser(email);
      if (!user) {
        res.status(401).send("User not found");
      } else {
        if (!password || password === '') {
          res.status(400).send("Password required");
        } else {
          bcrypt.compare(password, user.password, async (error, result) => {
            if (error || !result) {
              res.status(401).send("Incorrect password");
            } else {
              const token = jwt.sign({ email: user.email, _id: user._id }, jwtSecret);
              res.json({ token });
            }
          });
        }
      }
    } catch (e) {
      next(e);
    }
  }
});

// Logout: POST/login/logout
// I think you just need to delete the token in the frontend.
// It is the frontend's responsibility to delete the token and logout.

// Change Password POST /login/password
router.post("/password", isAuthorized, async (req, res, next) => {
  const { password } = req.body;
  if (!password || password === '') {
    res.status(400).send("New password required");
  } else {
    try {
      const newEncryptedPassword = await bcrypt.hash(password, 10);
      const success = await userDao.updatePassword(req.userInfo._id, newEncryptedPassword);
      res.sendStatus(success ? 200 : 400);
    } catch (e) {
      res.status(500).send(e.message);
    }
  }
});

// Error handling middleware
router.use(errorHandler);

module.exports = router;
