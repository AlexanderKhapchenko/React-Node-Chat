const { message } = require('../models/message');

const createMessageValid = (req, res, next) => {
    try {
			validateFieldsExist(req.body);
    } catch (error) {
        res.status(400).error = error;
    } finally {
        next();
    }
}

const validateFieldsExist = body => {
	const {id, createdAt, editedAt, ...otherKeys} = message;
	const neededKeys = Object.keys(otherKeys).sort().join();
	const bodyKeys = Object.keys(body).sort().join();

	if(neededKeys !== bodyKeys) {
			throw `Expected or Unexpected fields. Props have only ${neededKeys}`;
	}
}

exports.createMessageValid = createMessageValid;