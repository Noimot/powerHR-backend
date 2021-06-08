import { Router } from 'express'
import LeaveController from '../controllers/LeaveController.js'
import CheckConflicts from '../middleware/CheckConflicts.js'

const leaveRouter = Router();

leaveRouter.post('/new',
CheckConflicts.checkUserExistence,
LeaveController.leaveRequest
)

leaveRouter.get('/all',
LeaveController.getPendingLeave
)

leaveRouter.put('/update',
CheckConflicts.checkLeaveid,
LeaveController.updateLeaveStatus
)

export default leaveRouter;