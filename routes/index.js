const { Router } = require("express");
const router = Router();

// const userDao = require('../daos/user');

router.use("/login", require('./login'));
router.use("/post", require('./post'));
router.use("/thread", require('./thread'));

// router.use("/other", require('./other'));

module.exports = router;
