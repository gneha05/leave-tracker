const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const url="mongodb://127.0.0.1:27017/LeaveTrackerDB";

const employeeSchema=new Schema({
    id:String,
    fullName:String,
    userName:String,
    password:String,
    position:String,
    unit:String,
    managerId:String,
    address:{
        street:String,
        city:String,
        state:String,
        zip:Number
    },
    mobile:String,
    emailId:String,
    profilePhoto:String,
    availedLeaves:{
        paidLeave:Number,
        sickLeave:Number,
        maternityLeave:Number,
        unpaidLeave:Number,
        specialLeave:Number,
    },
    leaveStatus:{
        approved:Number,
        pending:Number,
        rejected:Number
    },
    leaveHistory:{
        leaveId:String,
        leaveType:String,
        from:Date,
        to:Date,
        noOfdays:Number,
        remark:String,
        status:String
    }

} , {collection :"Employees" , timestamps:true});

const managersSchema=new Schema({
    id:String,
    fullName:String,
    position:String,
    mobile:String,
    emailId:String,
} , {collection :"Managers" , timestamps:true});

const totalLeavesSchema=new Schema({
    id:String,
    typeOfLeave:String,
    noOfLeaves:Number
} , {collection :"TotalLeaves" , timestamps:true});

const holidaySchema=new Schema({
    date:Date,
    holiday:String
} , {collection :"Holidays" , timestamps:true});

let collection={};

collection.getEmpData = async()=>{
    try {
        await mongoose.connect(url);
        let empModel = await mongoose.model("Employees" , employeeSchema);
        return empModel;
    } catch (err) {
        console.log(err);
        let error=new Error("Could not connect to DB");
        error.status=500;
        throw error;
    }
}

// collection.getManagerData = async()=>{
//     try {
//         await mongoose.connect( url);
//         let managerModel = await mongoose.model("Managers" , managersSchema);
//         return managerModel;
//     } catch (err) {
//         let error=new Error("Could not connect to DB");
//         error.status=500;
//         throw error;
//     }
// }

// collection.getTotalLeavesData = async()=>{
//     try {
//         await mongoose.connect( url );
//         let totalLeaveModel = await mongoose.model("TotalLeaves" , totalLeavesSchema);
//         return totalLeaveModel;
//     } catch (err) {
//         let error=new Error("Could not connect to DB");
//         error.status=500;
//         throw error;
//     }
// }

// collection.getHolidayData = async()=>{
//     try {
//         await mongoose.connect(url);
//         let holidayModel = await mongoose.model("Holidays" , holidaySchema);
//         return holidayModel;
//     } catch (err) {
//         let error=new Error("Could not connect to DB");
//         error.status=500;
//         throw error;
//     }
// }

module.exports=collection;
