const router = require('express').Router();
const scopesController = require('../controllers/scopes');
const catchErrors = require('../middlewares/catchErrors');
const requireLogin = require('../middlewares/requireLogin');

router.post('/', requireLogin, catchErrors(scopesController.createScope));
router.put('/', requireLogin, catchErrors(scopesController.updateScope));
router.delete('/', requireLogin, catchErrors(scopesController.deleteScope));
router.put('/archive', requireLogin, catchErrors(scopesController.archiveScope));
router.put('/unarchive', requireLogin, catchErrors(scopesController.unarchiveScope));

module.exports = router;
