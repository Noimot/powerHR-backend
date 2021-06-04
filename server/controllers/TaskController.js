import connect from '../database/connect.js'


class TaskController {
    static addTask(req, res) {
        const { tasks } = req.body;

        connect.query(
            `INSERT INTO task (tasks) VALUES ('${tasks}')`,
            (err, response) => {
                console.log(err, 'err')
                if (err) return res.json({ message: 'There is an error' })
                const result = JSON.parse(JSON.stringify(response.rows))
                console.log(result)
                if (result) {
                    return res.status(201).json({
                        status: 'success',
                        statusCode: 201,
                        message: 'message successfully added to database'
                    })
                }
                else {
                    return res.status(404).json({
                        status: 'failed',
                        statusCode: 404,
                        message: 'failed to connect to database'
                    })
                }

            }
        )

    }

    static allTasks(req, res) {
        connect.query(
            `SELECT * FROM task`,
            (err, response) => {
                if (err) return res.json({ message: 'there is an error' })
                const result = JSON.parse(JSON.stringify(response.rows))
                if (result) {
                    return res.status(201).json({
                        status: 'success',
                        statusCode: 201,
                        message: 'get data in database',
                        tasks: result
                    })
                }
                else {
                    return res.status(404).json({
                        status: 'failed',
                        statusCode: 404,
                        message: 'failed to get data'
                    })
                }
            }

        )
    }

    static completedTask(req, res) {
        const { id } = req.body;
        connect.query(
            `UPDATE task SET iscompleted=true WHERE id='${id}'`,
            (err, response) => {
                const result = JSON.parse(JSON.stringify(response.rows))
                // console.log(response.rows)
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
                        message: 'failed to update database'
                    })
                }

            })

    }
}

export default TaskController;