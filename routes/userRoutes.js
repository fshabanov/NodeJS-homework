const { Router } = require("express");
const UserService = require("../services/userService");
const {
	createUserValid,
	updateUserValid,
} = require("../middlewares/user.validation.middleware");
const { responseMiddleware } = require("../middlewares/response.middleware");

const router = Router();

// TODO: Implement route controllers for user

router
	.route("/")
	.get((req, res, next) => {
		const users = UserService.getAll();
		if (!users) {
			res.error = {
				error: true,
				message: "No users found",
				status: 404,
			};
		} else {
			res.data = {
				data: users,
				status: 200,
			};
		}
		next();
	}, responseMiddleware)
	.post(
		createUserValid,
		(req, res, next) => {
			const data = req.body;
			const allUsers = UserService.getAll();
			if (
				allUsers.find(
					(usr) =>
						usr.email === data.email || usr.phoneNumber === data.phoneNumber
				)
			) {
				res.error = {
					error: true,
					message: "User already exists",
					status: 400,
				};
				next();
				return;
			}
			const user = UserService.create(data);
			if (!user) {
				res.error = {
					error: true,
					message: "User not created",
					status: 400,
				};
			} else {
				res.data = {
					data: user,
					status: 201,
				};
			}
			next();
		},
		responseMiddleware
	);

router
	.route("/:id")
	.get((req, res, next) => {
		const id = req.params.id;
		const user = UserService.search(id);
		if (!user) {
			res.error = {
				error: true,
				message: "User not found",
				status: 404,
			};
		} else {
			res.data = {
				data: user,
				status: 200,
			};
		}
		next();
	}, responseMiddleware)
	.put(
		updateUserValid,
		(req, res, next) => {
			const id = req.params.id;
			const data = req.body;
			const user = UserService.update(id, data);
			if (!user) {
				res.error = {
					error: true,
					message: "User not updated",
					status: 400,
				};
			} else {
				res.data = {
					data: user,
					status: 204,
				};
			}
			next();
		},
		responseMiddleware
	)
	.delete((req, res, next) => {
		const id = req.params.id;
		const user = UserService.delete(id);
		if (!user) {
			res.error = {
				error: true,
				message: "User not deleted",
				status: 400,
			};
		} else {
			res.data = {
				data: user,
				status: 204,
			};
		}
		next();
	}, responseMiddleware);

module.exports = router;
