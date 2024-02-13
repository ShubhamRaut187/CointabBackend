const {pool} = require('../Configuration/db');
const {Router} = require('express');

const PostRoutes = Router();

PostRoutes.get('/:UserId',(req,res)=>{
    const {UserId} = req.params;
    const query = 'SELECT * FROM posts WHERE UserId = ?';
    pool.query(query,UserId,(error,results)=>{
        if(error){
            console.log('Error while getting post of single user',error);
            res.status(500).send({'Message':'Error to get post of single user'});
            return;
        }

        if(results.length === 0){
            res.status(404).send({'Message':'No posts found'});
            return;
        }

        res.status(200).json({'Posts':results});

    })
});

PostRoutes.post('/create/:UserId',(req,res)=>{
    const {UserId} = req.params;
    const bulk_data = req.body;
    const query = 'INSERT INTO posts SET ?';

    for(let i = 0;i<bulk_data.length;i++){
        const data = bulk_data[i];

        pool.query(query,UserId,(error,results)=>{
            if(error){
                console.log('Error while saving posts of user',error);
                res.status(500).send({'Message':'Error while saving post of user'});
                return;
            }

        })
    }

    res.status(200).send({'Message':'Posts saved successfully'});

})

module.exports = {
    PostRoutes
}