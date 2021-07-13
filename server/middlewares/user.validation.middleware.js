const { user } = require('../models/user');
const UserService = require('../services/userService');
const createUserValid = (req, res, next) => {
    try {
				const defaultAvatar = 'https://image.flaticon.com/icons/png/512/847/847969.png';
				const defaultRole = 'user';	

				if(!req.body.avatar || req.body.avatar === '') {
					req.body.avatar = defaultAvatar;
				}

				if(!req.body.role) {
					req.body.role = defaultRole;
				}	

				if(req.body.role !== 'admin' && req.body.role !== 'user') {
					throw `Role ${req.body.role} doesn't exist`;
				}

        validateFieldsExist(req.body);
        validateUserName(req.body);
        validateEmail(req.body.email);
        validateUserExist(req);
        validatePassword(req.body.password);
    } catch (error) {
        res.status(400).error = error;
    } finally {
        next();
    }
}


const validateFieldsExist = body => {
    const {id, createdAt, ...otherKeys} = user;
    const neededKeys = Object.keys(otherKeys).sort().join();
    const bodyKeys = Object.keys(body).sort().join();

    if(neededKeys !== bodyKeys) {
        throw `Expected or Unexpected fields. Props have only ${neededKeys}`;
    }
}

const validatePassword = password => {
    if (password && password.length < 3) {
        throw 'the password must be at least three characters long';
    }
}

const validateEmail = email => {
    let re = /^[a-z0-9](\.?[a-z0-9]){3,}@[Gg][Mm][Aa][Ii][Ll]\.com$/;
    if (email && !re.test(email)) {
        throw 'Not a valid Gmail email address example: user@gmail.com';
    }
}

const validateUserName = body => {
    if(body.name && body.name.replace(/\s/g, '').length < 1){
        throw 'Name can`t be empty';
    }
}

const validateUserExist = req => {
	if (UserService.search({email: req.body.email})) { 
		throw `This email ${req.body.email} already used`;
	}

	if (UserService.search({name: req.body.name})) {
			throw `This name ${req.body.name} already used`;
	}
}

const validateUserExistForUpdate = req => {
	const userByEmail = UserService.search({email: req.body.email});

	// Check if existing user it this user
	if (userByEmail && userByEmail.id !== req.params.id) { 
		throw `This email ${req.body.email} already used`;
	}

	const userByName = UserService.search({name: req.body.name});
	if (userByName && userByName.id !== req.params.id) {
			throw `This name ${req.body.name} already used`;
	}
}

const updateUserValid = (req, res, next) => {
    try {
        const {id, ...neededKeys} = user;
        const bodyKeys = Object.keys(req.body);

        bodyKeys.forEach((element) => {
            if (!neededKeys.hasOwnProperty(element)) {
                throw `Unexpected ${element} fields`;
            }
        });

        if (!UserService.search({id: req.params.id})) { 
            throw `There is no user with id ${req.params.id}`;
        }

        if(!isBodyHasFieldToUpdate(bodyKeys, neededKeys)) {
            throw 'No one filds to update';
        }

				if(req.body.role && req.body.role !== 'admin' && req.body.role !== 'user') {
					throw `Role ${req.body.role} doesn't exist`;
				}

        validateUserExistForUpdate(req);
        validateUserName(req.body);
        validateEmail(req.body.email);
        validatePassword(req.body.password);

    } catch (error) {
        res.status(400).error = error;
    } finally {
        next();
    }
}

const isBodyHasFieldToUpdate = (bodyKeys, neededKeys) => {
    let isUpdate = false;
    bodyKeys.forEach(element => {
        if (neededKeys.hasOwnProperty(element)) {
            isUpdate = true;
        } 
    });
    return isUpdate;
}

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;