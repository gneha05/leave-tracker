const userData=require('../model/dbSetUp');

userDb={};

userDb.getUsers=async()=>{
    let users=await userData.getAllUsers();
    if(users){
        return users;
    }else{
        let err=new Error("Error occured in getUsers of userData service...");
        err.status=401;
        throw err;
    }
};

userDb.getManagers=async()=>{
    let managers=await userData.getAllManagers();
    if(managers){
        return managers;
    }else{
        let err=new Error("Error occured in getManagers of userData service...");
        err.status=401;
        throw err;
    }
};

userDb.getLeaves=async()=>{
    let leaves=await userData.getTotalLeaves();
    if(leaves){
        return leaves;
    }else{
        let err=new Error("Error occured in getLeaves of userData service...");
        err.status=401;
        throw err;
    }
}

userDb.getHolidays=async()=>{
    let holidays=await userData.getHolidayList();
    if(holidays){
        return holidays;
    }else{
        let err=new Error("Error occured in getHolidays of userData service...");
        err.status=401;
        throw err;
    }
}

userDb.updateAvlLeave=async(empId,updatedAvlLeave)=>{
    let updatedAvail=await userData.updateAvlLeaves(empId,updatedAvlLeave);
    if(updatedAvail){
        return updatedAvail;
    }else{
        let err=new Error("Error occured in updating availed leaves...");
        err.status=401;
        throw err;
    }
};

userDb.updateLeaveStat=async(empId,updatedLeaveStatus)=>{
    let updatedStat=await userData.updateLeaveStat(empId, updatedLeaveStatus);
    if(updatedStat){
        return updatedStat;
    }else{
        let err=new Error("Error occured in updating leave status...");
        err.status=401;
        throw err;
    }
};

userDb.updateLeaveHist=async(empId,updatedLeaveHist)=>{
    let updatedHistory=await userData.updateLeaveHistory(empId, updatedLeaveHist);
    if(updatedHistory){
        return updatedHistory;
    }else{
        let err=new Error("Error occured in updating leave history...");
        err.status=401;
        throw err;
    }
};



module.exports=userDb;