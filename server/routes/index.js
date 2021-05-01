import { Router } from 'express'
// import authRouter from './auth'

const apiRoutes = Router();
// apiRoutes.use('/auth', authRouter)

apiRoutes.get('/', (req, res) => {
    res.status(200).send({
        url: `${req.protocol}://${req.headers.host}`,
        status: 'success',
        message: 'welcome to apiRoutes'
    })
})


export default apiRoutes;