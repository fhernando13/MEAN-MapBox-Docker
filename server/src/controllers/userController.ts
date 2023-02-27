import {Request, Response} from 'express';

import pool from '../database';

class UserController{

    public list (req: Request, res: Response){
        pool.query("SELECT * FROM test.users ", (error, results, fields) => { 
            if(error) { 
                console.log(error); 
                return res.status(400).send('error'); 
            }
            return res.status(200).send(results); 
        });      
    }

    public getOne (req: Request, res: Response){
        const {id} = req.params;
        pool.query("SELECT * FROM test.users where id = ?", [id], (error, results, fields) => { 
            if(error) { 
                console.log(error); 
            }if(results == false) {
                console.log('User not exist!!');
                return res.status(400).send('User not exist!!'); 
            }
            return res.status(200).send(results); 
        });      
    }

    public create(req: Request, res:Response){
        const { name, fathers_lastname, mothers_lastname, age, email, phone, state, town, code_postal, suburb,street, no_street } = req.body;
        const data={
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
        pool.query("INSERT INTO test.users set ?",[data], (error, results, fields) => { 
            if(error) { 
                console.log(error); 
                return res.status(400).send('error'); 
            }
            return res.status(200).send('User saved'); 
        });
    }
  
    public delete(req: Request, res:Response){
        const {id} = req.params;
        console.log(id);
        pool.query("SELECT * FROM test.users where id = ?", [id], (error, results, fields) => { 
            if(error){
                console.log(error); 
                return res.status(400).send('error'); 
            }if(results.length <= 0){
                console.log('User not exist');
                return res.status(500).send('User not exist');
            }else{
                pool.query("DELETE FROM test.users where id = ?", [id]);
                return res.status(200).send('User was deleted');
            }
        });
    }

    public update(req: Request, res:Response){
        const {id} = req.params;
        console.log(id);
        pool.query("SELECT * FROM test.users where id = ?", [id], (error, results, fields) => { 
            if(error){
                console.log(error); 
                return res.status(400).send('error'); 
            }if(results.length <= 0){
                console.log('User not exist');
                return res.status(500).send('User not exist');
            }else{
                const { name, lastname, age, email } = req.body;
                pool.query("UPDATE test.users SET ? WHERE id=?", [req.body, id]);
                return res.status(200).send('User updated');
            }
        });
    }

};

const userController = new UserController();
export default userController;
