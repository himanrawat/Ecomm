/*
this file contains controller logic for the category resource
Everytime a CRUD request come for the category, methods define in this controller file will be executed
*/

const db = require("../models");
const Category = db.category;

/*
 *POST : create and save a new category
 */

exports.create = (req, res) => {
	/*
	 * validation of request body
	 */

	if (!req.body.name) {
		res.status(400).send({
			message: "Name of the category can't be empty!",
		});
		return;
	}
	/*
	 * Creation of the category object to be stored in the db
	 */

	const category = {
		name: req.body.name,
		description: req.body.description,
	};

	Category.create(category)
		.then((category) => {
			console.log(`category name : [${category.name}] got inserted`);
			res.status(201).send(category);
		})
		.catch((err) => {
			console.log(`Issue in inserting category name : [${category.name}]`);
			console.log(`Error Message: ${err.message}`);
			res.status(500).send({
				message: "some internal error while storing category ",
			});
		});
};

exports.findAll = (req, res) => {
	let categoryName = req.query.name;
	let promise;
	if (categoryName) {
		promise = Category.findAll({
			where: {
				name: categoryName,
			},
		});
	} else {
		promise = Category.finaAll();
	}

	promise
		.then((categories) => {
			res.status(200).send(categories);
		})
		.catch((err) => {
			res.status(500).send({
				message: "Some internal error while fetching category",
			});
		});
};

/*
 * Get a category based on the category id
 */

exports.findOne = (req, res) => {
	const categoryId = req.params.id;

	Category.findByPk(categoryId)
		.then((category) => {
			res.status(200).send(category);
		})
		.catch((err) => {
			res.status(500).send({
				message: "Some internal error while fetching category",
			});
		});
};

exports.update = (req, res) => {
	const category = {
		name: req.body.name,
		description: req.body.description,
	};

	const categoryId = req.params.id;

	Category.update(category, {
		where: { id: categoryId },
	})
		.then((updateCategory) => {
			Category.findByPk(categoryID)
				.then((category) => {
					res.status(200).send(category);
				})
				.catch((err) => {
					res.status(500).send({
						message: "Some internal error while fetching the data",
					});
				});
		})
		.catch((err) => {
			res.status(500).send({
				message: "Some internal error while fetching the data",
			});
		});
};

/*
 * Delete on existing category based on category id
 */

exports.delete = (req, res) => {
	const categoryId = req.params.id;

	Category.destroy({
		where: {
			id: categoryId,
		},
	})
		.then((result) => {
			res.status(200).send({
				message: "Successfully deleted the category",
			});
		})
		.catch((err) => {
			res.status(500).send({
				message: "Some internal error while deleting the data",
			});
		});
};
