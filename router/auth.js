const express = require('express');
const UserSchema = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const auth = require('../middleware/auth');
const router = express.Router();

const { check, validationResult } = require('express-validator');

router.get('/', auth, async (req, res) => {
	try {
		const user = await UserSchema.findById(req.user.id).select('-password');
		res.json(user);
	} catch (error) {
		console.log(error.message);
	}
});
router.post(
	'/',
	[
		check('email', 'Pease Enter Email').isEmail(),
		check('password', 'Please Enetr Last 4 Digits of your Phone'),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const { email, password } = req.body;

			const userExist = await UserSchema.findOne({ email });
			if (!userExist) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'Invalid Credintials' }] });
			}

			const isMatch = await bcrypt.compare(password, userExist.password);
			console.log(isMatch);
			if (!isMatch) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'Invalid Credintials' }] });
			}
			const payload = {
				user: {
					id: userExist.id,
				},
			};
			jwt.sign(
				payload,
				config.jwtsecret,
				{ expiresIn: 360000 },
				(err, token) => {
					if (err) {
						throw err;
					}
					res.json({ token });
				},
			);
		} catch (err) {
			res.send(400).res.json(err.message);
		}
	},
);

module.exports = router;
