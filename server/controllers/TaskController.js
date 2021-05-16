import connect from '../database/connect.js'


class TaskController {
    static addTask (req, res) {
        const { tasks } = req.body;

        connect.query (
            `INSERT INTO task (tasks) VALUES ('${tasks}')`,
            (err, response) => {
                console.log(err, 'err')
                if (err) return res.json({message:'There is an error'})
                const result = JSON.parse(JSON.stringify(response.rows))
                if (result){
                    return res.status(201).json({
                        status: 'success',
                        statusCode: 201,
                        message:'message successfully added to database'
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
}

export default TaskController;