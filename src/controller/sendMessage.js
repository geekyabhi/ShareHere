const { sendMessage } = require("../utilFunctions/message");

const sendMessageController = async (req, res, next) => {
	try {
		const { number, url, message } = req.body;
		if (!number) {
			res.statusCode = 400;
			throw new Error("Number Missing");
		}
		if (!url) {
			res.statusCode = 400;
			throw new Error("Url missing");
		}
		const result = await sendMessage(message, number, url);
		res.status(200).send({
			success: true,
			data: result,
		});
	} catch (e) {
		next(e);
	}
};

module.exports = { sendMessageController };
