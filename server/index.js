import express from 'express';
import bodyParser from 'body-parser';
// import dotenv from 'dotenv';
import cors from 'cors'; 
import apiRoutes from './routes/index.js'



// dotenv.config()
const port = process.env.PORT||4000

const app = express()
app.use(cors())


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('api/v1', apiRoutes)

app.get('*', (request, response) => {
    response.status(404).json({
        status: 'error',
        message: 'The resource you requested does not exist'
    })
})



app.listen(port, function(){
    console.log('app is ready')
})


export default app;