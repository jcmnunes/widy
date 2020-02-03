const router = require('express').Router();
const catchErrors = require('../middlewares/catchErrors');
const authControllers = require('../controllers/auth');
const requireLogin = require('../middlewares/requireLogin');
const confirmPasswords = require('../middlewares/confirmPasswords');

router.post('/login', authControllers.login);
router.get('/logout', authControllers.logout);
router.get('/check', requireLogin, authControllers.check);
router.post('/forgot', catchErrors(authControllers.forgot));
router.post('/reset', confirmPasswords, catchErrors(authControllers.reset));
router.post('/change', requireLogin, confirmPasswords, catchErrors(authControllers.change));

module.exports = router;
