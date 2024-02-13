const {pool} = require('../Configuration/db');
const {Router} = require('express');

const UserRoutes = Router();

UserRoutes.post('/create',(req,res)=>{
    const user_data = req.body;

    const {id,Name,Email,Phone,Website,Company,City} = req.body;

    if(!id || !Name || !Email || !Phone || !Website || !Company || !City){
        res.status(400).send({'Message':'Required fields are missing'});
        return;
    }

    const query = 'INSERT INTO users SET ?';
    pool.query(query,user_data,(error,results,fields)=>{
        if(error){
            console.log('Error in creating user',error);
            res.status(500).json({'Message':'Error while saving user'});
            return;
        }
        res.status(201).json({'Message':'User Saved Successfully'});
    })
})

UserRoutes.get('/',(req,res)=>{
    const query = 'SELECT * from users'
    pool.query(query,(error,results)=>{
        if(error){
            console.log(error);
            res.status(500).json({'Message':'Internal Server Error'});
            return;
        }
        res.json({'Users':results});
    })
})

UserRoutes.get('/:id',(req,res)=>{
    const {id} = req.params;
    const query = 'SELECT * FROM users WHERE id = ?';
    pool.query(query,id,(error,results)=>{
        if(error){
            console.log('Error while getting user',error);
            res.status(500).send({"Message":'Erreo while getting user'});
            return;
        }

        if(results.length === 0){
            res.status(404).send({'Message':'No user found'});
            return;
        }
        const User = results[0];
        res.status(200).json({'Users':User});
        
    })
})

module.exports = {
    UserRoutes
}

