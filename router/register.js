const express = require('express');
const UserSchema = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const auth = require('../middleware/auth');
const router = express.Router();
const nodemailer = require('nodemailer');
const UserTodo = require('../model/Todo');

const { check, validationResult } = require('express-validator');

router.post(
	'/',
	[
		check('name', 'Please Enter  Name').notEmpty(),
		check('email', 'Please Enter  Email').isEmail(),
		check('phone', 'Please Enter  Phone').isLength({ min: 10 }),
	],

	async (req, res) => {
		const errors = validationResult(req);
		console.log(errors);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, phone } = req.body;
		try {
			const userExist = await UserSchema.findOne({ email });

			if (userExist) {
				console.log('error');
				return res
					.status(400)
					.json({ errors: [{ msg: 'User Already Exists' }] });
			}

			const password = phone.toString().slice(-4);
			const user = new UserSchema({
				name,
				email,
				phone,
				password,
			});
			const salt = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(password, salt);

			await user.save();
			const payload = {
				user: {
					id: user.id,
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
			// Send Email to the User if Registration is success
			let transporter = nodemailer.createTransport({
				service: 'gmail',
				port: 465,
				secure: true, // true for 465, false for other ports
				auth: {
					user: 'nonscamtest@gmail.com', // generated ethereal user
					pass: 'Testmail2020', // generated ethereal password
				},
			});
			let info = await transporter.sendMail({
				from: '"Manage your Todo App" <leult2018@gmail.com>', // sender address
				to: user.email, // list of receivers
				subject: 'Welcome to Todo App', // Subject line
				text: `Welcome ${user.name} I am glad you join the Manage Todo App \n
					 you password will be the last four digits of your phone. Please give me a feedback `, // plain text body
				html: `<p>Welcome ${user.name} I am glad you join the Manage Todo App \n </p>
						<a href="www.google.com"><b>Please Verify Your Email</b></a>
					 <p>you password will be the last four digits of your phone. Please give me a feedback </p>`, // html body
			});
			// you can get the messageID here  info.messageId);

			// nodemailer.getTestMessageUrl(info));
			console.log('Email Sent');
		} catch (error) {
			res.status(400).json(error);
		}

		// res.json(newUser);
	},
);
router.delete('/', auth, async (req, res) => {
	const user = await UserSchema.findByIdAndDelete(req.user.id);
	const todo = await UserTodo.findOneAndDelete({ user: req.user.id });
	res.json({ user, todo });
});

module.exports = router;
