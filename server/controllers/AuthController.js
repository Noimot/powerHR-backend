import connect from '../database/connect.js'
import Token from '../utils/Token.js'
import dotenv from "dotenv";

dotenv.config();


class AuthController {

    static userLogin(req, res) {
        const adminPassword = process.env.ADMIN_PASSWORD;
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminId = process.env.ADMIN_ID_NUMBER;
        if (adminPassword) {
            const tokenData = {
                email: adminEmail,
                adminId,
                expiryTime: "500h"
            };
            const token = Token.generateToken(tokenData);
            return res.status(200).json({
                status: "success",
                statusCode: 200,
                message: "login successful",
                token,
            });
        } else {
            return res.status(400).json({
                status: "error",
                statusCode: 400,
                message: "Email or Password is wrong",
            });
        }

        // res.status(200).json({
        //     message: 'login successful',
        //     body: req.body
        // })
    }

    static userSignup(req, res) {
        res.status(200).json({
            status: 'successful',
            message: 'welcome to power-hr',
            body: req.body
        })
    }

    static adminName(req, res) {
        res.status(200).json({
            status: 'successful',
            message: 'welcome to power-hr',
            name: process.env.ADMIN_NAME
        })
    }

}

export default AuthController;

