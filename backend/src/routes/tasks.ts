import { catchErrors } from '../middlewares/catchErrors';
import {
  createTask,
  deleteTask,
  getActiveTask,
  getTasks,
  moveTask,
  scheduleTask,
  startTask,
  stopTask,
  updateTask,
} from '../controllers/tasks';
import requireLogin from '../middlewares/requireLogin';

const router = require('express').Router();

router.post('/', requireLogin, catchErrors(createTask));
router.get('/', requireLogin, catchErrors(getTasks));
router.get('/active', requireLogin, catchErrors(getActiveTask));
router.put('/:id/move', requireLogin, catchErrors(moveTask));
router.put('/:id', requireLogin, catchErrors(updateTask));
router.delete('/:id', requireLogin, catchErrors(deleteTask));
router.put('/:id/start', requireLogin, catchErrors(startTask));
router.put('/:id/stop', requireLogin, catchErrors(stopTask));
router.post('/:id/schedule', requireLogin, catchErrors(scheduleTask));

export default router;
