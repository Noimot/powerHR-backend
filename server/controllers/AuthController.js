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

    static employeeList(req, res){
        const { company_email, personal_email} = req.body;
        const userid = new Date();
        res.status(200).json({
            message: 'success'
        })
        connect.query(
            `INSERT INTO users ( userid, company_name, personal_name) 
            VALUES '${company_email}', '${userid}', '${personal_email}'`,
            (err, response) => {
                const result = JSON.parse(JSON.stringify(response.rows))
                if (result){
                    return res.status(201).json({
                        status: 'success',
                        statusCode: 201,
                        message: 'data successfully added to database'
                    })
                }
                else {
                    return res.status(401).json({
                        status: 'error',
                        statusCode: 401,
                        message: 'data not added'
                    })
                }
            }
        )
        
    }
}

export default AuthController;