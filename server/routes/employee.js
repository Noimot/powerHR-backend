import { Router } from 'express'
import EmployeeController from '../controllers/EmployeeController.js'
import CheckConflicts from '../middleware/CheckConflicts.js'
import Token from '../utils/Token.js'


const employeeRouter = Router();

employeeRouter.post('/add',
Token.verifyToken,
CheckConflicts.validatePermission,
CheckConflicts.existingUser,
EmployeeController.employee
)

employeeRouter.get('/all',
EmployeeController.allEmployee)

employeeRouter.post('/userid',
EmployeeController.getEmployeeByUserid
)

employeeRouter.put('/update',
EmployeeController.updateEmployeeData
)






export default employeeRouter;