import TaskController from '../controllers/TaskController.js'
import { Router } from 'express'
import CheckConflicts from '../middleware/CheckConflicts.js';

const taskRouter = Router();

taskRouter.post('/new',
TaskController.addTask
)

taskRouter.get('/all',
TaskController.allTasks
)

taskRouter.put('/update',
CheckConflicts.checkTaskid,
TaskController.completedTask)

export default taskRouter;