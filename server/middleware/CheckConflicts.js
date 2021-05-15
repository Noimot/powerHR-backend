import connect from '../database/connect.js'

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
        const { password, adminId, email } = req.body;
        if(password !== process.env.ADMIN_PASSWORD || adminId !== process.env.ADMIN_ID_NUMBER){
            return res.status(401).json({
                message: 'incorrect password or id'
            })
        }
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
                message: "email address already exit",
              });
            }
            next();
          }
        );
      }
    
}

export default CheckConflicts;