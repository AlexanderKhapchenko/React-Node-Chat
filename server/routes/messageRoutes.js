const { Router } = require('express');
const MessageService = require('../services/messageService');
const { createMessageValid } = require('../middlewares/message.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

router.get('/', (req, res, next) => {
        res.data = MessageService.getAll();
        next();
}, responseMiddleware);

router.get('/:id', (req, res, next) => {
    try {
        const user = MessageService.search({id: req.params.id});
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

router.post('/', createMessageValid, (req, res, next) => {
    if(res.error){
        return next();
    }
    res.data = MessageService.create(req.body);
    next();
}, responseMiddleware);

router.put('/:id', (req, res, next) => {
    if(res.error){
        return next();
    }
    res.data = MessageService.update(req.params.id, req.body);
    next();
}, responseMiddleware);

router.delete('/:id', (req, res, next) => {
    if(res.error){
        return next();
    }
    res.data = MessageService.delete(req.params.id);
    next();
}, responseMiddleware);

module.exports = router;