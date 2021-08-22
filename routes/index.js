const { Router } = require("express");
const router = Router();

router.use("/login", require('./login'));
// router.use("/other", require('./other'));
// router.use("/post", require('./post'));
// router.use("/thread", require('./thread'));

module.exports = router;
