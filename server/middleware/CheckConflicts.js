import connect from '../database/connect.js'
import bcrypt from "bcryptjs"


class CheckConflicts {
  static validateUserDetails(req, res, next) {
    const password = req.body.password;
    if (password.length < 8) {
      return res.status(400).json({
        status: 'error',
        message: 'password length is less than 8'
      })
    }
    next();
  }


  static authenticateUserDetails(req, res, next) {
    console.log(req.body)
    const { password, adminId } = req.body;

    const loginType = () => {
      const isEmail = validateEmail(adminId);
      if (isEmail) {
        return adminId === process.env.ADMIN_EMAIL
      }
      else {
        return adminId === process.env.ADMIN_ID_NUMBER
      }
    }



    function validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email.toLowerCase());
    }

    connect.query(
      `SELECT * FROM add_employee WHERE company_email='${adminId}' or userid='${adminId}' `,
      async (err, response) => {
        const [result] = await JSON.parse(JSON.stringify(response.rows))
        if (result) {
          bcrypt.compare(password, result.password, function (err, doc) {
            if (doc) {
              req.user = {
                role: result.role,
                userid: result.userid,
                expiryTime: "500h",
                employee_name: result.employee_name
              }
              next();
            }

          })
        }
        else {
          adminLogin()
        }

      }

    )

    function adminLogin() {
      if (!loginType() || password !== process.env.ADMIN_PASSWORD) {
        return res.status(401).json({
          message: 'incorrect password or id'
        })
      } else {
        console.log('this is admin')
        req.user = {
          role: 'admin',
          expiryTime: "500h"
        }
        next()
      }
    }

    // next();
  }

  static existingUser(req, res, next) {
    const { company_email, personal_email } = req.body;
    connect.query(
      `SELECT company_email, personal_email FROM add_employee WHERE company_email='${company_email}'`,
      (err, response) => {
        console.log(err, "err");
        const result = JSON.parse(JSON.stringify(response.rows));
        if (result.length > 0) {
          return res.status(409).json({
            status: "error",
            message: "email address already exist",
          });
        }
        next();
      }
    );
  }

  static checkTaskid(req, res, next) {
    const { id } = req.body
    console.log(id)
    connect.query(
      `SELECT * FROM task WHERE id='${id}'`,
      (err, response) => {
        console.log(response)
        const result = JSON.parse(JSON.stringify(response.rows))
        console.log(result)
        if (result.length <= 0) {         
          return res.status(400).json({
            status: 'error',
            message: 'id does not exist'
          })
        }
        else if (result[0].iscompleted === true) {
          return res.status(200).json({
            status: 'successful',
            message: 'iscompleted is true'
          })
        }
        next()
      }
    )
  }


  static checkLeaveid(req, res, next) {
    const { id } = req.body
    console.log(id)
    connect.query(
      `SELECT * FROM leave_request WHERE id='${id}'`,
      (err, response) => {
        console.log(response)
        const result = JSON.parse(JSON.stringify(response.rows))
        console.log(result)
        if (result.length <= 0) {         
          return res.status(400).json({
            status: 'error',
            message: 'id does not exist'
          })
        }
        else if (result[0].leave_status === 'deny' || result[0].leave_status === 'approve') {
          return res.status(200).json({
            status: 'successful',
            message: 'updated leave status'
          })
        }
        next()
      }
    )
  }

  static checkUserExistence (req, res, next) {
    const { name } = req.body;
    console.log(req.body)
    connect.query(
      `SELECT employee_name FROM add_employee WHERE employee_name='${name}'`,
      (err, response) => {
        console.log(err, 'err')
        const result = JSON.parse(JSON.stringify(response.rows))
        if(result.length === 0){
          return res.status(400).json({
            status: 'failed',
            statusCode: 400,
            message: 'employee does not exist'
          })
        }
        next()
      }
    )
  }

  static validatePermission (req, res, next) {
    const { role } = req.decoded;
    if (role !== 'admin') {
      return res.status(403).json({
        status: 'error',
        message: 'permission denied'
      })
    }
    next();
  }

}

export default CheckConflicts;