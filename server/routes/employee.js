import { Router } from 'express'
// import AuthController from '../controllers/AuthController.js'
import EmployeeController from '../controllers/EmployeeController.js'


const employeeRouter = Router();

employeeRouter.post('/add',
EmployeeController.employee
)






export default employeeRouter;