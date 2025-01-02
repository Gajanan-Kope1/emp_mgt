const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			status: 400,
			msg: errors.array().map(err => err.msg).join(', '),
			data: null,
		});
	}
	next();
};

module.exports = validate;