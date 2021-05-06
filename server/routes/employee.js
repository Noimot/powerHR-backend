import { Router } from 'express'
import AuthController from '../controllers/AuthController.js'



const employeeRouter = Router();

employeeRouter.post('/',
AuthController.employeeList
)






export default employeeRouter;