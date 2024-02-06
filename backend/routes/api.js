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

router.get('/managers' , async(req,res,next)=>{
    try {
        let managers=await userService.getManagers();
        res.send(managers);
    } catch (error) {
        next(error);
    }
});

router.get('/totalLeaves' , async(req,res,next)=>{
    try {
        let leaves=await userService.getLeaves();
        res.send(leaves);
    } catch (error) {
        next(error);
    }
});

router.get('/holidays' , async(req,res,next)=>{
    try {
        let holidays=await userService.getHolidays();
        res.send(holidays);
    } catch (error) {
        next(error);
    }
});

router.put('/employees/:updatedEmployee' , async(req,res,next)=>{
    try {
        const employeeId=req.params.empId;
        const updatedEmployee=req.body;
        let empdata=await userService.updateLeaveHistory(employeeId , updatedEmployee);

        res.json({
            message:`Availed leaves data for Emp:${employeeId} updated successfully`
        });
        res.status=200;


    } catch (error) {
        next(error);
    }
});

router.get('/')

module.exports=router;