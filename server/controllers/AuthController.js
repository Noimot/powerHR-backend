import connect from '../database/connect.js'

class AuthController{
    static userLogin(req, res){
        res.status(200).json({
            message: 'login successful',
            body: req.body
        })
    }

    static userSignup(req, res){
        res.status(200).json({
            status: 'successful',
            message: 'welcome to power-hr',
            body: req.body
        })
    }

    static adminName(req, res){
        res.status(200).json({
            status: 'successful',
            message: 'welcome to power-hr',
            name: process.env.ADMIN_NAME
        })
    }

}

export default AuthController;