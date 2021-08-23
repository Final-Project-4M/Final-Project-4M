const { Router } = require("express");
const router = Router();

const userDao = require('../daos/user');

router.get("/", async (req, res, next) => {
  try {
    const allUsers = await userDao.getAllUser();
    res.json(allUsers);
  } catch (e) {
    next(e);
  }
});

router.use("/login", require('./login'));
// router.use("/other", require('./other'));
// router.use("/post", require('./post'));
// router.use("/thread", require('./thread'));

module.exports = router;
