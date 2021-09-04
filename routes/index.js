const { Router } = require("express");
const router = Router();
const { corsFunction } = require('../middleware/cors');

// to fix cors issue
router.use(corsFunction);

router.use("/login", require('./login'));
router.use("/post", require('./post'));
router.use("/thread", require('./thread'));
// router.use("/other", require('./other'));

module.exports = router;
