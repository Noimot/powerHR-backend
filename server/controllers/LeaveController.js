import connect from '../database/connect.js'

class LeaveController {
    static leaveRequest(req, res) {
        // console.log(req.body)
        const { start_date, end_date, reason } = req.body;
        const { employee_name, userid, department } = req.decoded
        console.log(req.decoded)
        // const { userid} = req.decoded


        connect.query(
            `INSERT INTO leave_request (start_date, end_date, reason, leave_status, userid, name, department) VALUES ('${start_date}', '${end_date}', '${reason}', 'pending', '${userid}', '${employee_name}', '${department}')`,
            (err, response) => {
                if (err) return ({ message: 'there is an error' })
                console.log(err, 'err')
                const result = JSON.parse(JSON.stringify(response.rows))
                if (result) {
                    return res.status(201).json({
                        status: 'success',
                        statusCode: 201,
                        message: 'successfully added data to database'
                    })
                }
                else {
                    return res.status(400).json({
                        status: 'failed',
                        statuscode: 400,
                        message: 'failed to add data to database'
                    })
                }
            }
        )
    }

    static getPendingLeave (req, res) {
        connect.query(
            `SELECT * FROM leave_request`,
            (err, response) => {
                console.log(err, 'err')
                const result = JSON.parse(JSON.stringify(response.rows))
                if (result) {
                    return res.status(201).json({
                        status: 'success',
                        statusCode: 201,
                        message: 'successfully fetched data from database',
                        pendingLeave: result
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

    static updateLeaveStatus (req, res) {
        const { id, reason_for_app_deny_leave, leave_status } = req.body;
        console.log(req.body)
        connect.query(
            `UPDATE leave_request SET leave_status='${leave_status}', reason_for_app_deny_leave='${reason_for_app_deny_leave}' WHERE id='${id}'`,
            (err, response) => {
                console.log(response)
                console.log(err, 'err')
                const result = JSON.parse(JSON.stringify(response.rows))
                if (result) {
                    return res.status(201).json({
                        status: 'success',
                        statusCode: 201,
                        message: 'successfully updated database'
                    })
                }
                else {
                    return res.status(400).json({
                        status: 'failed',
                        statusCode: 400,
                        message: 'failed to connect to database'
                    })
                }
            }
        )
    }

}

export default LeaveController;