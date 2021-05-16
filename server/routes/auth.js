import { Router } from 'express'
import AuthController from '../controllers/AuthController.js'
import CheckConflicts from '../middleware/CheckConflicts.js'


const authRouter = Router();

authRouter.post('/login',
CheckConflicts.authenticateUserDetails,  
AuthController.userLogin)

authRouter.post('/signup',
CheckConflicts.validateUserDetails,
AuthController.userSignup)

authRouter.get('/admin',
AuthController.adminName)


export default authRouter;