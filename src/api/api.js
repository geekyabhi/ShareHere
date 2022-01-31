const router = require("express").Router();

const sendMailAPI = require("../router/sendMail");

const activateAPI = () => {
	router.use("/send-mail", sendMailAPI);
	console.log(`All API activated`.cyan);
	return router;
};

module.exports = { activateAPI };
