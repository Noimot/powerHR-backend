import connect from '../database/connect.js'
import { v4 as uuidv4 } from "uuid"
import bcrypt from "bcryptjs"
import nodemailer from 'nodemailer'

class EmployeeController {
    static employee(req, res) {
        console.log(req.body)
        const { company_email, personal_email, employee_name } = req.body;
        const userid = Date.now();
        const password = uuidv4().split('').splice(6,8).join('');
        const hashedPassword = bcrypt.hashSync(password, 10)
       

        connect.query(
            `INSERT INTO add_employee (userid, company_email, personal_email, employee_name, password, role)
            VALUES ('${userid}', '${company_email}', '${personal_email}', '${employee_name}', '${hashedPassword}', 'employee')
            `,
            (err, response) => {
                console.log(err, 'err')
                const result = JSON.parse(JSON.stringify(response.rows))
                if (result){
                    return res.status(200).json({
                        status: 'success',
                        statusCode: 201,
                        message: 'data successfully added to database'
                    })
                }
                else {
                    return res.status(400).json({
                        status: 'fail',
                        statusCode: '400',
                        message: 'failed to connect to database'
                    })
                }

            }

        )

        const employee_info = `
        <p>Dear ${employee_name} , your powerHR account has been successfully created. login with the credentials received to complete your profile</p>
        <p> company email: ${company_email}</p>
        <p> password: ${password}</P>
        <p> userid: ${userid}</p>
        `

        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'app.powerHR@gmail.com',
                pass: 'powerhrapp'
            }
        });
          
        let mailDetails = {
            from: '"powerHR Admin"<app.powerHR@gmail.com>',
            to: `${personal_email}`,
            subject: `Employee login credentials`,
            html: employee_info
        };
          
        mailTransporter.sendMail(mailDetails, function(err, data) {
            if(err) {
                console.log(err,'Error Occurs');
            } else {
                console.log('Email sent successfully');
            }
        });
    }



    static allEmployee(req, res) {
        connect.query(
            `SELECT * FROM add_employee`,
            (err, response) => {
                if (err) return res.json({ message: 'an error occur'})
                const result = JSON.parse(JSON.stringify(response.rows))
                if (result) {
                    return res.status(201).json({
                        status: 'success',
                        statusCode: 201,
                        message: 'successfully connected to database',
                        employeeData: result
                    })
                }
                else {
                    return res.status(400).json({
                        status: 'failed',
                        statusCode: 400,
                        message: 'failed to get data from database'
                    })
                }
            }
        )
    }

    static getEmployeeByUserid (req, res) {
            const { userid } =req.body;
            // console.log(req.body, 'err')

            connect.query(
                `SELECT * FROM add_employee WHERE userid='${userid}'`,
                (err, response) => {
                    // if(err) return res.json({message: 'an error occur'})
                    console.log(err, 'err')
                    const result = JSON.parse(JSON.stringify(response.rows));
                    if(result) {
                        return res.status(201).json({
                            status: 'success',
                            statusCode: 201,
                            message: 'successfully fetched data from database',
                            employeeData: result
                        })
                    }
                    else {
                        return res.status(400).json({
                            status:'failed',
                            statusCode: 400,
                            message: 'unable to fetch data from database'
                        })
                    }
                }
            )
    }
}

export default EmployeeController;

