require('dotenv').config();

const user = process.env.USERDB || 'user';
const pass = process.env.PASS || 'password';
const host = process.env.HOST || 'name_host';
const dbname = process.env.DATABASE || 'database_name';

export default {
    
    database: {
        host: host,
        user: user,
        password: pass,
        databse: dbname
    }

};