const router = require("express").Router();
const { sendMessageController } = require("../controller/sendMessage");

router.route("/").post(sendMessageController);

module.exports = router;
