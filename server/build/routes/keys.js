"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const user = process.env.USERDB || 'user';
const pass = process.env.PASS || 'password';
const host = process.env.HOST || 'name_host';
const dbname = process.env.DATABASE || 'database_name';
exports.default = {
    database: {
        host: host,
        user: user,
        password: pass,
        databse: dbname
    }
};
