import { Router } from 'express'
import AuthController from '../controllers/AuthController.js'



const employeeRouter = Router();

employeeRouter.post('/employee',
AuthController.employeeList
)






export default employeeRouter;