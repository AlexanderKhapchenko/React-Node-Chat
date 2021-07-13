const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid, validateUserExist } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

router.get('/', (req, res, next) => {
        res.data = UserService.getAll();
        next();
}, responseMiddleware);

router.get('/:id', (req, res, next) => {
    try {
        const user = UserService.search({id: req.params.id});
        if(!user) {
            throw `There is no user with id ${req.params.id}`;
        }
        res.data = user;    
    } catch (error) {
        res.status(404).error = error;
    } finally {
        next();
    }
}, responseMiddleware);

router.post('/', createUserValid, (req, res, next) => {
    if(res.error){
        return next();
    }
    res.data = UserService.create(req.body);
    next();
}, responseMiddleware);

router.put('/:id', updateUserValid, (req, res, next) => {
    if(res.error){
        return next();
    }
    res.data = UserService.update(req.params.id, req.body);
    next();
}, responseMiddleware);

router.delete('/:id', (req, res, next) => {
    if(res.error){
        return next();
    }
    res.data = UserService.delete(req.params.id);
    next();
}, responseMiddleware);

module.exports = router;