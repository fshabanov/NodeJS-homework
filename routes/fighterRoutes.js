const { Router } = require("express");
const FighterService = require("../services/fighterService");
const { responseMiddleware } = require("../middlewares/response.middleware");
const {
	createFighterValid,
	updateFighterValid,
} = require("../middlewares/fighter.validation.middleware");

const router = Router();

// TODO: Implement route controllers for fighter

router
	.route("/")
	.get((req, res, next) => {
		const fighters = FighterService.getAll();
		if (!fighters) {
			res.error = {
				error: true,
				message: "No fighters found",
				status: 404,
			};
		} else {
			res.data = fighters;
		}
		next();
	}, responseMiddleware)
	.post(
		createFighterValid,
		(req, res, next) => {
			const data = req.body;
			const allFighters = FighterService.getAll();
			if (
				allFighters.find(
					(f) => f?.name?.toLowerCase() === data?.name?.toLowerCase()
				)
			) {
				res.error = {
					error: true,
					message: "Fighter already exists",
					status: 400,
				};
				next();
				return;
			}
			if (!data.health) data.health = 100;
			const fighter = FighterService.create(data);
			if (!fighter) {
				res.error = {
					error: true,
					message: "Fighter not created",
					status: 400,
				};
			} else {
				res.data = {
					data: fighter,
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
		const fighter = FighterService.search(id);
		if (!fighter) {
			res.error = {
				error: true,
				message: "Fighter not found",
				status: 404,
			};
		} else {
			res.data = fighter;
		}
		next();
	}, responseMiddleware)
	.put(
		updateFighterValid,
		(req, res, next) => {
			const id = req.params.id;
			const data = req.body;
			const fighter = FighterService.update(id, data);
			if (!fighter) {
				res.error = {
					error: true,
					message: "Fighter not updated",
					status: 400,
				};
			} else {
				res.data = fighter;
			}
			next();
		},
		responseMiddleware
	)
	.delete((req, res, next) => {
		const id = req.params.id;
		const fighter = FighterService.delete(id);
		if (!fighter) {
			res.error = {
				error: true,
				message: "Fighter not deleted",
				status: 400,
			};
		} else {
			res.data = fighter;
		}
		next();
	}, responseMiddleware);

module.exports = router;
