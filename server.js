const express = require("express");
const bodyParser = require("body-parser");
const serverConfig = require("./configs/server.config");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = require("./models");
// const { init } = require("express/lib/application");
// const { category } = require("./models");
const Category = db.category;

db.sequelize.sync({ force: true }).then(() => {
	console.log("tables droped and created");
	init();
});

function init() {
	var categories = [
		{
			name: "Electronics",
			description: "this category will contain all the electronic product",
		},
		{
			name: "Kitchen items",
			description: "This category will contains all the kitchen products",
		},
	];

	Category.bulkCreate(categories)
		.then(() => {
			console.log("Category table initialised");
		})
		.catch((err) => {
			console.log("Error while initialising categories table");
		});
}

require("./routes/category.routes")(app);

app.listen(serverConfig.PORT, () => {
	console.log(`Server is up and running at ${serverConfig.PORT}`);
});
