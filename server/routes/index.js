import { Router } from 'express'
import announcementRouter from './announcements.js';
import authRouter from './auth.js'
import employeeRouter from './employee.js'

const apiRoutes = Router();
apiRoutes.use('/auth', authRouter)
apiRoutes.use('/employee', employeeRouter)
apiRoutes.use('/announcements', announcementRouter)

apiRoutes.get('/', (req, res) => {
    res.status(200).send({
        url: `${req.protocol}://${req.headers.host}`,
        status: 'success',
        message: 'welcome to apiRoutes'
    })
})


export default apiRoutes;