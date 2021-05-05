 import { Pool } from "pg"
 import dotenv from "dotenv"

 dotenv.config();

 const mydatabase = process.env.DATABASE_URL;


//  const pool = new Pool({
//      user: "dbuser",
//      host: "database.server.com",
//      database: "mydb",
//      password: "123456",
//      port: 5432,
//  });

 const connect = new Pool({
     connectionString: mydatabase,
     ssl: { rejectUnauthorized: false }
 });

 connect.on('error', (err, client) => {
     console.error('Error:', err);
 });


 export default connect;

