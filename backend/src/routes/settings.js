const router = require('express').Router();
const settingsController = require('../controllers/settings');
const catchErrors = require('../middlewares/catchErrors');
const requireLogin = require('../middlewares/requireLogin');

router.get('/pomodoro', requireLogin, catchErrors(settingsController.getPomodoroSettings));
router.put('/pomodoro', requireLogin, catchErrors(settingsController.updatePomodoroSettings));

module.exports = router;
