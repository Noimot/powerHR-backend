import connect from '../database/connect.js'
import { v4 as uuidv4 } from "uuid"
import bcrypt from "bcryptjs"
import nodemailer from 'nodemailer'

class EmployeeController {
    static employee(req, res) {
        const { company_email, personal_email, employee_name } = req.body;
        const userid = Date.now();
        const generated_password = uuidv4();
        const hashedPassword = bcrypt.hashSync(generated_password, 10)
        const password = hashedPassword.split('').splice(6,8).join('');
       

        connect.query(
            `INSERT INTO add_employee (userid, company_email, personal_email, employee_name, password)
            VALUES ('${userid}', '${company_email}', '${personal_email}', '${employee_name}', '${password}')
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
        <p> company email: ${company_email}</p>
        <p> password: ${password}</P>
        <p> userid: ${userid}</p>
        `

        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'kikkyal@gmail.com',
                pass: 'abbey@2020'
            }
        });
          
        let mailDetails = {
            from: '"powerHR Admin"<kikkyal@gmail.com>',
            to: '${personal_email}',
            subject: 'Dear ${employee_name} , your powerHR account has been successfully created. login with the credentials received to complete employee profile',
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
}

export default EmployeeController;

