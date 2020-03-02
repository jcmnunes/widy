import { catchErrors } from '../middlewares/catchErrors';
import { login, logout, check, forgot, reset, change } from '../controllers/auth';
import requireLogin from '../middlewares/requireLogin';
import confirmPasswords from '../middlewares/confirmPasswords';

const router = require('express').Router();

router.post('/login', catchErrors(login));
router.get('/logout', catchErrors(logout));
router.get('/check', requireLogin, catchErrors(check));
router.post('/forgot', catchErrors(forgot));
router.post('/reset', confirmPasswords, catchErrors(reset));
router.post('/change', requireLogin, confirmPasswords, catchErrors(change));

export default router;
