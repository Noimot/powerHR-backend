import { Router } from 'express'
import MemoController from '../controllers/MemoController.js'

const memoRouter = Router();

memoRouter.post('/new',
MemoController.addMemo
)

memoRouter.get('/all',
MemoController.getAllMemo
)

export default memoRouter;