const { Router } = require('express');
const AuthService = require('../services/authService');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

router.post('/login', (req, res, next) => {
  try {
    const data = AuthService.login(req.body);
    res.data = data;
  } catch (error) {
    res.status(404).error = error;
  } finally {
    next();
  }
}, responseMiddleware);

module.exports = router;