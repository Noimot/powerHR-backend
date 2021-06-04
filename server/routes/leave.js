import { Router } from 'express'
import LeaveController from '../controllers/LeaveController.js'

const leaveRouter = Router();

leaveRouter.post('/new',
LeaveController.leaveRequest
)

export default leaveRouter;