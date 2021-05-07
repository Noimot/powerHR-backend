import connect from '../database/connect.js'

class EmployeeController {
    static employee(req, res) {
        const { company_email, personal_email } = req.body;
        const userid = Date.now();

        connect.query(
            `INSERT INTO add_employee (userid, company_email, personal_email)
            VALUES ('${userid}', '${company_email}', '${personal_email}')
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
    }
}

export default EmployeeController;
