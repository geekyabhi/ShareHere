const router = require("express").Router();

const sendMailAPI = require("../router/sendMail");
const sendMessageAPI = require("../router/sendMessage");

const activateAPI = () => {
	router.use("/send-mail", sendMailAPI);
	router.use("/send-message", sendMessageAPI);
	console.log(`All API activated`.cyan);
	return router;
};

module.exports = { activateAPI };
