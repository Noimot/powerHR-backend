import { Router } from 'express'
import AnnouncementController from '../controllers/AnnouncementController.js'
import Token from '../utils/Token.js'
import CheckConflicts from '../middleware/CheckConflicts.js'

const announcementRouter = Router();


announcementRouter.get('/all',
AnnouncementController.getAllAnnouncement
)


announcementRouter.post('/new',
Token.verifyToken,
CheckConflicts.validatePermission,
AnnouncementController.announcement,
)


export default announcementRouter;
