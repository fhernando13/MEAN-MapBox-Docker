"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class UserController {
    list(req, res) {
        database_1.default.query("SELECT * FROM test.users ", (error, results, fields) => {
            if (error) {
                console.log(error);
                return res.status(400).send('error');
            }
            return res.status(200).send(results);
        });
    }
    getOne(req, res) {
        const { id } = req.params;
        database_1.default.query("SELECT * FROM test.users where id = ?", [id], (error, results, fields) => {
            if (error) {
                console.log(error);
            }
            if (results == false) {
                console.log('User not exist!!');
                return res.status(400).send('User not exist!!');
            }
            return res.status(200).send(results);
        });
    }
    create(req, res) {
        const { name, fathers_lastname, mothers_lastname, age, email, phone, state, town, code_postal, suburb, street, no_street } = req.body;
        const data = {
            name,
            fathers_lastname,
            mothers_lastname,
            age,
            email,
            phone,
            state,
            town,
            code_postal,
            suburb,
            street,
            no_street,
        };
        database_1.default.query("INSERT INTO test.users set ?", [data], (error, results, fields) => {
            if (error) {
                console.log(error);
                return res.status(400).send('error');
            }
            return res.status(200).send('User saved');
        });
    }
    delete(req, res) {
        const { id } = req.params;
        console.log(id);
        database_1.default.query("SELECT * FROM test.users where id = ?", [id], (error, results, fields) => {
            if (error) {
                console.log(error);
                return res.status(400).send('error');
            }
            if (results.length <= 0) {
                console.log('User not exist');
                return res.status(500).send('User not exist');
            }
            else {
                database_1.default.query("DELETE FROM test.users where id = ?", [id]);
                return res.status(200).send('User was deleted');
            }
        });
    }
    update(req, res) {
        const { id } = req.params;
        console.log(id);
        database_1.default.query("SELECT * FROM test.users where id = ?", [id], (error, results, fields) => {
            if (error) {
                console.log(error);
                return res.status(400).send('error');
            }
            if (results.length <= 0) {
                console.log('User not exist');
                return res.status(500).send('User not exist');
            }
            else {
                const { name, lastname, age, email } = req.body;
                database_1.default.query("UPDATE test.users SET ? WHERE id=?", [req.body, id]);
                return res.status(200).send('User updated');
            }
        });
    }
}
;
const userController = new UserController();
exports.default = userController;
