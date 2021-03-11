import { getReport } from '../controllers/report';
import { catchErrors } from '../middlewares/catchErrors';
import { requireLogin } from '../middlewares/requireLogin';

const router = require('express').Router();

router.get('/:dayId', requireLogin, catchErrors(getReport));

export default router;
