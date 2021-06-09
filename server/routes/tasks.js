import TaskController from '../controllers/TaskController.js'
import { Router } from 'express'
import CheckConflicts from '../middleware/CheckConflicts.js';
import Token from '../utils/Token.js'

const taskRouter = Router();

taskRouter.post('/new',
Token.verifyToken,
CheckConflicts.validatePermission,
TaskController.addTask
)

taskRouter.get('/all',
TaskController.allTasks
)

taskRouter.put('/update',
CheckConflicts.checkTaskid,
TaskController.completedTask)

export default taskRouter;