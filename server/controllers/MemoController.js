 import connect from '../database/connect.js'

 class MemoController {
     static addMemo (req, res) {
         const  {subject, memos } = req.body;
         connect.query(
             `INSERT INTO memo (subject, memos) VALUES ( '${subject}', '${memos}' )`,
             (err, response) => {
                 if (err) return ({ message: 'there is an error' })
                 const result = JSON.parse(JSON.stringify(response.rows))
                 if (result) {
                     res.status(201).json({
                         status: 'success',
                         statusCode: 201,
                         message: 'data successfully added to database'
                     })
                 }
                 else {
                     res.status(400).json({
                         status: 'failed',
                         statusCode: 400,
                         message: 'failed to connect to database'
                     })
                 }
             }
         )
     }
     static getAllMemo (req,res) {
         connect.query(
             `SELECT * FROM memo`,
             (err, response) => {
                 if (err) return res.json({ message: 'There is an error'})
                 const result = JSON.parse(JSON.stringify(response.rows))
                 if(result) {
                     return res.status(201).json({
                         status: 'success',
                         statusCode: 201,
                         message: 'successfully retrieved data from database',
                         memos: result
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




export default MemoController;