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

router.put('/employees/:empId/update-leave', async(req,res,next)=>{
    try {
        const empId=req.params.empId;
        const updatedAvlLeave=req.body;
        let empdata=await userService.updateAvlLeave(empId , updatedAvlLeave);

        res.json({
            message:`Availed leaves data for Emp:${empId} updated successfully`
        });
        res.status=200;

    } catch (error) {
        next(error);
    }
});


router.put('/employees/:empId/update-leave-status' , async(req,res,next)=>{
    try {
        const empId=req.params.empId;
        const updatedLeaveStatus=req.body;
        console.log(req.body);
        let empdata=await userService.updateLeaveStat(empId , updatedLeaveStatus);

        res.json({
            message:`Leave status for Emp:${empId} updated successfully`
        });
        res.status=200;
    } catch (error) {
        next(error);
    }
       
});

router.put('/employees/:empId/update-leave-history' , async(req,res,next)=>{
    try {
        const empId=req.params.empId;
        const updatedLeaveHist=req.body;
        let empdata=await userService.updateLeaveHist(empId , updatedLeaveHist);

        res.json({
            message:`Leave history for Emp:${empId} updated successfully`
        });
        res.status=200;
    } catch (error) {
        next(error);
    }
       
});

router.get('/')

module.exports=router;