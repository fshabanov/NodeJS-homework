const { user } = require("../models/user");

const createUserValid = (req, res, next) => {
	// TODO: Implement validatior for user entity during creation
	// firstName, lastName, email, phone, password
	const { firstName, lastName, email, phoneNumber, password } = req.body;
	if (!firstName || !lastName) {
		res.status(400).json({
			error: true,
			message: "Name cannot be empty",
			status: 400,
		});
		return;
	}
	if (!email || !/@gmail.com\s*$/.test(email)) {
		res.status(400).json({
			error: true,
			message: "Invalid email",
			status: 400,
		});
		return;
	}
	if (!phoneNumber || !/\+380[0-9]{9}$/g.test(phoneNumber)) {
		res.status(400).json({
			error: true,
			message: "Invalid phone number",
			status: 400,
		});
		return;
	}
	if (!password || password.length < 3) {
		res.status(400).json({
			error: true,
			message: "Invalid password",
			status: 400,
		});
		return;
	}
	next();
};

const updateUserValid = (req, res, next) => {
	// TODO: Implement validatior for user entity during update
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

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;
