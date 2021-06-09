import { Router } from 'express'
import MemoController from '../controllers/MemoController.js'
import Token from '../utils/Token.js'
import CheckConflicts from '../middleware/CheckConflicts.js'

const memoRouter = Router();

memoRouter.post('/new',
Token.verifyToken,
CheckConflicts.validatePermission,
MemoController.addMemo
)

memoRouter.get('/all',
MemoController.getAllMemo
)

export default memoRouter;