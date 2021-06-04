import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
// import cors from 'cors'; 
import apiRoutes from './routes/index.js'




dotenv.config()
const port = process.env.PORT||4000

const app = express()
// app.use
app.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    response.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS');
    next();
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/api/v1', apiRoutes)


console.log(process.env.ADMIN_ID_NUMBER)

app.all('*', (request, response) => {
    response.status(404).json({
        status: 'error',
        message: 'The resource you requested does not exist'
    })
})



app.listen(port, function(){
    console.log('app is ready')
})


export default app;