import {
  archiveScope,
  createScope,
  deleteScope,
  unarchiveScope,
  updateScope,
} from '../controllers/scopes';

import { catchErrors } from '../middlewares/catchErrors';

import requireLogin from '../middlewares/requireLogin';

const router = require('express').Router();

router.post('/', requireLogin, catchErrors(createScope));
router.put('/', requireLogin, catchErrors(updateScope));
router.delete('/', requireLogin, catchErrors(deleteScope));
router.put('/archive', requireLogin, catchErrors(archiveScope));
router.put('/unarchive', requireLogin, catchErrors(unarchiveScope));

export default router;
