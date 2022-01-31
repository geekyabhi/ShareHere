const { nextTick } = require("process");

const sendMail = async (req, res, next) => {
	try {
	} catch (e) {
		next(e);
	}
};

module.exports = { sendMail };
