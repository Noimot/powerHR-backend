import { Router } from 'express'
import LeaveController from '../controllers/LeaveController.js'
import CheckConflicts from '../middleware/CheckConflicts.js'
import Token from '../utils/Token.js'

const leaveRouter = Router();

leaveRouter.post('/new',
Token.verifyToken,
LeaveController.leaveRequest
)

leaveRouter.get('/all',
LeaveController.getPendingLeave
)

leaveRouter.put('/update',
Token.verifyToken,
CheckConflicts.validatePermission,
CheckConflicts.checkLeaveid,
LeaveController.updateLeaveStatus
)

export default leaveRouter;