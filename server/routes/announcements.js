import { Router } from 'express'
import AnnouncementController from '../controllers/AnnouncementController.js'
const announcementRouter = Router();


announcementRouter.get('/announcements',
)


announcementRouter.post('/new',
AnnouncementController.announcement,
)

announcementRouter.patch('/announcements',
)

announcementRouter.get('/announcements/:id',
)

announcementRouter.delete('/announcements/:id',
)

export default announcementRouter;
