import { getSchedule, moveAll } from '../controllers/schedule';
import { catchErrors } from '../middlewares/catchErrors';
import requireLogin from '../middlewares/requireLogin';

const router = require('express').Router();

router.get('/', requireLogin, catchErrors(getSchedule));
router.post('/move/:to', requireLogin, catchErrors(moveAll));

export default router;
