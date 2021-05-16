import TaskController from '../controllers/TaskController.js'
import { Router } from 'express'

const taskRouter = Router();

taskRouter.post('/new',
TaskController.addTask
)

export default taskRouter;