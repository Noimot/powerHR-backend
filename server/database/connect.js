import pkg from 'pg';
import dotenv from "dotenv"

const { Pool }  = pkg;

dotenv.config();

const mydatabase = process.env.DATABASE_URL;


const connect = new Pool({
    connectionString: mydatabase,
    ssl: { rejectUnauthorized: false }
});

connect.on('error', (err, client) => {
    console.error('Error:', err);
});


export default connect;

