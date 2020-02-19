import { getPomodoroSettings, updatePomodoroSettings } from '../controllers/settings';
import { catchErrors } from '../middlewares/catchErrors';
import requireLogin from '../middlewares/requireLogin';

const router = require('express').Router();

router.get('/pomodoro', requireLogin, catchErrors(getPomodoroSettings));
router.put('/pomodoro', requireLogin, catchErrors(updatePomodoroSettings));

export default router;
