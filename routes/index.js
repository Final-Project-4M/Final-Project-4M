const { Router } = require("express");
const router = Router();
const cors = require('cors');

// router.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next();
// });

router.use(cors());

router.use("/login", require('./login'));
router.use("/post", require('./post'));
router.use("/thread", require('./thread'));
// router.use("/other", require('./other'));

module.exports = router;
