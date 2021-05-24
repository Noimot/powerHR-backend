import connect from '../database/connect.js'

class AnnouncementController {
    static announcement(req, res) {
        const { announcements } = req.body;
        // const date_posted = Date.now();
        console.log(announcements)
        connect.query(
            `INSERT INTO announcement (announcements) VALUES ('${announcements}')`,
            (err, response) => {
                console.log(err, 'err')
                if (err) return res.json({ message: 'there is an error' })
                const result = JSON.parse(JSON.stringify(response.rows))
                if (result) {
                    return res.status(201).json({
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

    static getAllAnnouncement(req, res) {
        connect.query(
            `SELECT * FROM announcement`,
            (err, response) => {
                console.log(err, 'err')
                if (err) return res.json({ message: 'there is an error' })
                const result = JSON.parse(JSON.stringify(response.rows))
                if (result) {
                    return res.status(200).json({
                        status: 'success',
                        statusCode: 201,
                        message: 'data successfully added to database',
                        announcements: result
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

export default AnnouncementController;
