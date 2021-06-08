import connect from '../database/connect.js'

class LeaveController {
    static leaveRequest(req, res) {
        // console.log(req.body)
        const { name, start_date, end_date, reason } = req.body;

        connect.query(
            `INSERT INTO leave_request (name, start_date, end_date, reason, leave_status) VALUES ('${name}', '${start_date}', '${end_date}', '${reason}', 'pending')`,
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
        const { id, reason_for_app_deny_leave } = req.body;
        console.log(req.body)
        connect.query(
            `UPDATE leave_request SET leave_status='deny', reason_for_app_deny_leave='${reason_for_app_deny_leave}' WHERE id='${id}'`,
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