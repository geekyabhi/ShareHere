const router = require("express").Router();

const { sendMail } = require("../controller/sendMail");

router.route("/").post(sendMail);

module.exports = router;
