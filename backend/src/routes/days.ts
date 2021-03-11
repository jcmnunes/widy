import { createDay, getDay, getDays } from '../controllers/days';
import { catchErrors } from '../middlewares/catchErrors';
import { requireLogin } from '../middlewares/requireLogin';

const router = require('express').Router();

router.get('/', requireLogin, catchErrors(getDays));
router.get('/:id', requireLogin, catchErrors(getDay));
router.post('/', requireLogin, catchErrors(createDay));

export default router;
