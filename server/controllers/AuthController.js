import connect from '../database/connect.js'
import Token from '../utils/Token.js'
import dotenv from "dotenv";
import bcrypt from "bcryptjs"


dotenv.config();


class AuthController {

    static userLogin(req, res) {
        const adminPassword = process.env.ADMIN_PASSWORD;
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminId = process.env.ADMIN_ID_NUMBER;
        const { company_email, password } = req.body;

        connect.query(
            `SELECT password, role, first_name, last_name, company_email, userid FROM add_employee`,
            (err, response) => {
                console.log(err, "err");
                // console.log(response, "result");
                const result = JSON.parse(JSON.stringify(response.rows));
                // console.log(result, "result");
                console.log(result[12], "main result");

                if (result.length > 0) {
                    const checkPassword = bcrypt.compareSync(
                        password,
                        result[12].password
                    );

                    if (adminPassword || checkPassword) {
                        const tokenData = {
                            company_email,
                            role: result[0].role,
                            first_name: result[0].first_name,
                            last_name: result[0].last_name,
                            userid: result[0].userid,
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
                        });}
                    // } else {
                    //      res.status(400).json({
                    //         status: "error",
                    //         statusCode: 400,
                    //         message: "Email or Password is wrong",
                    //     });
                    // }

                    // res.status(200).json({
                    //     message: 'login successful',
                    //     body: req.body
                    // })
                }
            })}

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

