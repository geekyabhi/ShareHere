const fast2sms = require("fast-two-sms");

const FAST2SMS = process.env.FAST2SMS;

const sendMessage = (message, contactNumber, url) => {
	return new Promise(async (resolve, reject) => {
		try {
			const res = await fast2sms.sendMessage({
				authorization: FAST2SMS,
				message: `${message} : ${url}`,
				numbers: [contactNumber],
			});
			resolve(res);
		} catch (e) {
			reject(`Error:Error while sending message :${e}`);
		}
	});
};

module.exports = { sendMessage };
