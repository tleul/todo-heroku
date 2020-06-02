const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = function (req, res, next) {
	// Get token from header
	const token = req.header('x-auth-token');

	//Check if not token
	if (!token) {
		return res.status(401).json({ msg: 'NO token, Authorization denied' });
	}
	//verify token

	try {
		const decoded = jwt.verify(token, config.jwtsecret);
		req.user = decoded.user;
		next();
	} catch {
		res.status(401).json({ msg: 'Token is not valid' });
	}
};
