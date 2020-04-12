import * as controllers from '../controllers/scopes';
import { catchErrors } from '../middlewares/catchErrors';
import requireLogin from '../middlewares/requireLogin';

const router = require('express').Router();

router.get('/', requireLogin, catchErrors(controllers.getScopes));
router.post('/', requireLogin, catchErrors(controllers.createScope));
router.put('/', requireLogin, catchErrors(controllers.updateScope));
router.get('/:id', requireLogin, catchErrors(controllers.getScope));
router.delete('/:id', requireLogin, catchErrors(controllers.deleteScope));
router.put('/:id/archive', requireLogin, catchErrors(controllers.archiveScope));
router.put('/:id/unarchive', requireLogin, catchErrors(controllers.unarchiveScope));

export default router;
