const router = require('express').Router();
const daysController = require('../controllers/days');
const catchErrors = require('../middlewares/catchErrors');
const requireLogin = require('../middlewares/requireLogin');

router.get('/', requireLogin, catchErrors(daysController.getDays));
router.get('/:id', requireLogin, catchErrors(daysController.getDay));
router.post('/', requireLogin, catchErrors(daysController.createDay));

module.exports = router;
