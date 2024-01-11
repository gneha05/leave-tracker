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

module.exports=userDb;