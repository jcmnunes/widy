import { getSchedule } from '../controllers/schedule';
import { catchErrors } from '../middlewares/catchErrors';
import requireLogin from '../middlewares/requireLogin';

const router = require('express').Router();

router.get('/', requireLogin, catchErrors(getSchedule));

export default router;
