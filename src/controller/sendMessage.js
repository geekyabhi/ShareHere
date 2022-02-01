const { sendMessage } = require("../utilFunctions/message");

const MESSAGEDISABLE = process.env.MESSAGEDISABLE;

const sendMessageController = async (req, res, next) => {
	try {
		if (MESSAGEDISABLE !== "activate") {
			res.statusCode = 400;
			throw new Error(
				`Message facility not in use , to enable it contact admin at ${process.env.PHONE}`
			);
		}
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
			data: `Message send successfully !`,
		});
	} catch (e) {
		next(e);
	}
};

module.exports = { sendMessageController };
