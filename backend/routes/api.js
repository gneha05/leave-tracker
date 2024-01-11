const express=require('express');
const router=express.Router();

const userService=require('../services/userData');

router.get('/employees' , async(req,res,next)=>{
    try {
        let users=await userService.getUsers();
        res.send(users);
    } catch (error) {
        next(error);
    }
});

router.get('/')

module.exports=router;