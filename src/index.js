const express = require("express");
require("colors");
const morgan = require("morgan");
require("dotenv").config({ path: "./dev.env" });
const cors = require("cors");
const { activateAPI } = require("./api/api");
const { errorHandler } = require("./middlewere/errorHandler");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.get("/", (req, res, next) => {
	try {
		res.status(200).send({
			success: true,
			message: `Server running successfully on port ${PORT}`,
		});
	} catch (e) {
		next(e);
	}
});
app.use("/api", activateAPI());
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`.yellow);
});
