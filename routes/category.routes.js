/*
 * This file will contain the routing logic for the category controller
 */

const categoryController = require("../controllers/category.controller");

module.exports = function (app) {
	app.post("ecomm/api/v1/categorioes", categoryController.create);
	app.get("ecomm/api/v1/categorioes", categoryController.findAll);
	app.get("ecomm/api/v1/categorioes/:id", categoryController.findOne);
	app.put("ecomm/api/v1/categorioes/:id", categoryController.update);
	app.delete("ecomm/api/v1/categorioes/:id", categoryController.delete);
};
