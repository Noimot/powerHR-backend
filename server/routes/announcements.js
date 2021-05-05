import { Router } from 'express'
import AuthController from '../controllers/AuthController.js'
import CheckConflicts from '../middleware/CheckConflicts.js'

const announcementRouter = Router();


announcementRouter.get('/announcements',
)


announcementRouter.post('/announcements',
)

announcementRouter.patch('/announcements',
)

announcementRouter.get('/announcements/:id',
)

announcementRouter.delete('/announcements/:id',
)
