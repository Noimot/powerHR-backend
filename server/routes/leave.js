import { Router } from 'express'
import LeaveController from '../controllers/LeaveController.js'
import CheckConflicts from '../middleware/CheckConflicts.js'

const leaveRouter = Router();

leaveRouter.post('/new',
CheckConflicts.checkUserExistence,
LeaveController.leaveRequest
)

export default leaveRouter;