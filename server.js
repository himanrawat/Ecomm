const express = require("express");
const serverConfig = require("./configs/server.config");
const app = express();

app.listen(serverConfig.PORT, () => {
	console.log(`Server is up and running at ${serverConfig.PORT}`);
});
