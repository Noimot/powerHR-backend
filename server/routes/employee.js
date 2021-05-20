import { Router } from 'express'
// import AuthController from '../controllers/AuthController.js'
import EmployeeController from '../controllers/EmployeeController.js'
import CheckConflicts from '../middleware/CheckConflicts.js'


const employeeRouter = Router();

employeeRouter.post('/add',
CheckConflicts.existingUser,
EmployeeController.employee
)

employeeRouter.get('/all',
EmployeeController.allEmployee)






export default employeeRouter;