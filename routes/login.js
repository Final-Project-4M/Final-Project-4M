const { Router } = require("express");
const bcrypt = require('bcrypt');
const router = Router();

const userDAO = require('../daos/user');
const tokenDAO = require('../daos/token');

// POST /login/signup
router.post("/signup", async (req, res, next) => {
  const { email, password } = req.body;
  if (!password || !email) {
    res.status(400).send('Missing signup info');
  } else if (email === '' || password === '') {
    res.status(400).send('Both email and password cannot be empty');
  } else {
    try {
      const user = await userDAO.getUser(email);
      if (user) {
        res.status(409).send('Email already signed up');
      } else {
        const encryptedPassword = await bcrypt.hash(password, 10);
        const userInfo = ({ email, password: encryptedPassword });
        const savedUser = await userDAO.createUser(userInfo);
        res.json(savedUser);
      }
    } catch (e) {
      next(e);
    }
  }
});
