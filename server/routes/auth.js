import { Router } from 'express'
import AuthController from '../controllers/AuthController'
import CheckConflicts from '../middleware/CheckConflicts'

const authRouter = Router();

authRouter.post('/login',  AuthController.userLogin)

authRouter.post('/signup', 
CheckConflicts.validateUserDetails,
AuthController.userSignup)


export default authRouter;