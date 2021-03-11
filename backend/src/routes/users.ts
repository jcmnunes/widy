import { catchErrors } from '../middlewares/catchErrors';
import { requireLogin } from '../middlewares/requireLogin';
import { getMe, updateMe } from '../controllers/users';

const router = require('express').Router();

// router.post('/', catchErrors(registerUser));
router.get('/me', requireLogin, catchErrors(getMe));
router.put('/me', requireLogin, catchErrors(updateMe));

export default router;
