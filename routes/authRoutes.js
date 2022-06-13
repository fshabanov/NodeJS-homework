const { Router } = require("express");
const AuthService = require("../services/authService");
const { responseMiddleware } = require("../middlewares/response.middleware");

const router = Router();

router.post(
	"/login",
	(req, res, next) => {
		try {
			// TODO: Implement login action (get the user if it exist with entered credentials)
			const user = AuthService.login(req.body);
			if (!user || !user.password === req.body.password) {
				res.error = {
					error: true,
					message: "Invalid credentials",
					status: 401,
				};
			} else {
				res.data = { data: user, status: 200 };
			}
		} catch (err) {
			res.err = err;
		} finally {
			next();
		}
	},
	responseMiddleware
);

module.exports = router;
