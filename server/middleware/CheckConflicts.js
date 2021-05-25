import connect from '../database/connect.js'
import bcrypt from "bcryptjs"


class CheckConflicts {
    static validateUserDetails(req, res, next){
        const password = req.body.password;
        if(password.length < 8) {
            return res.status(400).json({
                status:'error',
                message:'password length is less than 8'
            })
        }
        next();
    }


    static authenticateUserDetails(req, res, next){
        const { password, adminId, email, company_email, userid } = req.body;

        connect.query(
          `SELECT password, role, first_name, last_name, company_email, userid FROM add_employee`,
          (err, response) => {
              // console.log(err, "err");
              // console.log(response, "result");
              const result = JSON.parse(JSON.stringify(response.rows));
              // console.log(result, "result");
              console.log(result[12], "main result");

              if (result.length > 0) {
                const hashedPassword = bcrypt.compareSync(
                  password,
                  result[12].password
                );

        if(password !== process.env.ADMIN_PASSWORD && adminId !== process.env.ADMIN_ID_NUMBER || password !== process.env.ADMIN_PASSWORD && email !== process.env.ADMIN_EMAIL || company_email !== result[12].company_email && password !== result[12].password || userid !== result[12].userid && password !== result[12].password ){
            return res.status(401).json({
                message: 'incorrect password or id'
            })
        }
      }
    })
        next();
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
    
}

export default CheckConflicts;