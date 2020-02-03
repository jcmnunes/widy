const router = require('express').Router();
const catchErrors = require('../middlewares/catchErrors');
const tasksController = require('../controllers/tasks');
const requireLogin = require('../middlewares/requireLogin');

router.post('/', requireLogin, catchErrors(tasksController.createTask));
router.get('/', requireLogin, catchErrors(tasksController.getTasks));
router.get('/active', requireLogin, catchErrors(tasksController.getActiveTask));
router.put('/move', requireLogin, catchErrors(tasksController.moveTask));
router.put('/:id', requireLogin, catchErrors(tasksController.updateTask));
router.delete('/:id', requireLogin, catchErrors(tasksController.deleteTask));
router.put('/start/:id', requireLogin, catchErrors(tasksController.startTask));
router.put('/stop/:id', requireLogin, catchErrors(tasksController.stopTask));

module.exports = router;
