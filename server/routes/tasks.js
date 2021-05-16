import TaskController from '../controllers/TaskController.js'
import { Router } from 'express'

const taskRouter = Router();

taskRouter.post('/new',
TaskController.addTask
)

taskRouter.get('/all',
TaskController.allTasks
)

export default taskRouter;