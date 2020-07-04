import { getSchedule, planAll } from '../controllers/schedule';
import { catchErrors } from '../middlewares/catchErrors';
import requireLogin from '../middlewares/requireLogin';

const router = require('express').Router();

router.get('/', requireLogin, catchErrors(getSchedule));
router.post('/planAll', requireLogin, catchErrors(planAll));

export default router;
