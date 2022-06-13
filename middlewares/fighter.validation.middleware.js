const { fighter } = require("../models/fighter");

const createFighterValid = (req, res, next) => {
	// TODO: Implement validatior for fighter entity during creation
	let { power, defense, health } = req.body;
	if (
		power < 1 ||
		power > 10 ||
		defense < 1 ||
		defense > 10 ||
		Object.keys(req.body).length > 3
	) {
		res.status(400).json({
			error: true,
			message: "Power and defense must be between 1 and 10",
			status: 400,
		});
		return;
	}
	if (!health) health = 100;
	if (health && (health < 80 || health > 120)) {
		res.status(400).json({
			error: true,
			message: "Invalid fighter data",
			status: 400,
		});
		return;
	}
	next();
};

const updateFighterValid = (req, res, next) => {
	// TODO: Implement validatior for fighter entity during update
	const data = req.body;
	if (Object.keys(data).length === 0) {
		res.status(400).json({
			error: true,
			message: "No data to update",
			status: 400,
		});
		return;
	}
	if (data.id) {
		res.status(400).json({
			error: true,
			message: "Id cannot be updated",
			status: 400,
		});
	}
	next();
};

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;
