const { sendEmail } = require("../utilFunctions/email");

const sendMail = async (req, res, next) => {
	try {
		const { email, url, message } = req.body;
		if (!email) {
			res.statusCode = 400;
			throw new Error("Email Missing");
		}
		if (!url) {
			res.statusCode = 400;
			throw new Error("Url missing");
		}
		const result = await sendEmail(email, url, message);
		res.status(200).send({
			success: true,
			data: "Mail send successfully !",
		});
	} catch (e) {
		next(e);
	}
};

module.exports = { sendMail };
