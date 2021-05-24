import connect from '../database/connect.js'

class AuthController {

    static userLogin(req, res) {
        const adminPassword = process.env.ADMIN_PASSWORD;
        if (adminPassword) {
            const tokenData = {
                email,
                role: result[0].role,
                firstName: result[0].firstName,
                lastName: result[0].lastName,
                userId: result[0].userid,
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

    static userLogin(req, res) {
        const { email, password } = req.body;

        connect.query(
            `SELECT * FROM users WHERE email = '${email}'`,
            (err, response) => {
                console.log(err, "err");
                console.log(response, "result");
                const result = JSON.parse(JSON.stringify(response.rows));
                console.log(result, "result");
                console.log(result[0], "main result");

                if (result.length > 0) {
                    const checkPassword = bcrypt.compareSync(
                        password,
                        result[0].password
                    );

                    if (checkPassword) {
                        const tokenData = {
                            email,
                            role: result[0].role,
                            firstName: result[0].firstName,
                            lastName: result[0].lastName,
                            userId: result[0].userid,
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

                } else {
                    return res.status(400).json({
                        status: "error",
                        statusCode: 400,
                        message: "Email or Password is wrong",
                    });
                }
            }
        );
    }

}

export default AuthController;

