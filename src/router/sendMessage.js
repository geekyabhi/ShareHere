const router = require("express").Router();
const { sendMessage } = require("../controller/sendMessage");

router.route("/").post(sendMessage);

module.exports = router;
