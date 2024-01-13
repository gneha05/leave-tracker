const connection = require('../utilities/connection');

const empDB=[
    {
        "id": "001",
        "fullName": "John Doe",
        "userName": "j.doe",
        "password": "12345@qwerty",
        "position": "Software Engineer",
        "unit": "Engineering",
        "managerId":"101",
        "address": {
          "street": "456 Design Avenue",
          "city": "Creativity city",
          "state": "CA",
          "zip": "54321"
        },
        "mobile": "+16352637783",
        "emailId": "john.doe123@gmail.com",
        "availedLeaves": {
          "paidLeave": 6,
          "sickLeave": 3,
          "maternityLeave": 0,
          "unpaidLeave": 0,
          "specialLeave": 2
        },
        "leaveStatus": {
          "approved": 4,
          "pending": 6,
          "rejected": 1
        },
        "leaveHistory": [
          {
            "leaveId": "L1",
            "leaveType": "Paid Leave",
            "from": "11/12/2023",
            "to": "11/13/2023",
            "noOfDays": "2",
            "remark": "Family event",
            "status": "Pending"
          },
          {
            "leaveId": "L2",
            "leaveType": "Sick Leave",
            "from": "7/12/2023",
            "to": "7/14/2023",
            "noOfDays": "3",
            "remark": "Leave due to sickness",
            "status": "Approved"
          },
          {
            "leaveId": "L3",
            "leaveType": "Special Leave",
            "from": "4/10/2023",
            "to": "4/10/2023",
            "noOfDays": "1",
            "remark": "Medical Appoitnment",
            "status": "Approved"
          },
          {
            "leaveId": "L4",
            "leaveType": "Paid Leave",
            "from": "10/23/2023",
            "to": "10/26/2023",
            "noOfDays": "4",
            "remark": "Personal Vacation",
            "status": "Pending"
          },
          {
            "leaveId": "L5",
            "leaveType": "Special Leave",
            "from": "5/3/2023",
            "to": "5/3/2023",
            "noOfDays": "1",
            "remark": "Personal Leave",
            "status": "Rejected"
          }
        ]
      },
      {
        "id": "003",
        "fullName": "Annie Williams",
        "userName": "annie.w",
        "password": "12345@qwerty",
        "position": "Project Manager",
        "unit": "Management",
        "manager": {
          "id": "108",
          "fullName": "Kenny Gomez",
          "position": "Senior project manager",
          "mobile": "+12342997153",
          "emailId": "kenny.g12@gmail.com"
        },
        "address": {
          "street": "123 Main St",
          "city": "Nytown",
          "state": "CA",
          "zip": "63884"
        },
        "mobile": "+18836401983",
        "emailId": "williams.ann@yahoo.co.in",
        "profilePhoto": "/assets/pp1.png",
        "availedLeaves": {
          "paidLeave": 10,
          "sickLeave": 2,
          "maternityLeave": 0,
          "unpaidLeave": 2,
          "specialLeave": 0
        },
        "leaveStatus": {
          "approved": 2,
          "pending": 10,
          "rejected": 2
        },
        "leaveHistory": [
          {
            "leaveId": "L1",
            "leaveType": "Sick Leave",
            "from": "5/12/2023",
            "to": "5/13/2023",
            "noOfDays": "2",
            "remark": "Break due to ill health",
            "status": "Approved"
          },
          {
            "leaveId": "L2",
            "leaveType": "Paid Leave",
            "from": "11/13/2023",
            "to": "11/24/2023",
            "noOfDays": "10",
            "remark": "Self Marriage",
            "status": "Pending"
          },
          {
            "leaveId": "L3",
            "leaveType": "Unpaid Leave",
            "from": "4/10/2023",
            "to": "4/11/2023",
            "noOfDays": "2",
            "remark": "Personal holiday",
            "status": "Rejected"
          }
        ]
      },
      {
        "id": "010",
        "fullName": "Alice Johnson",
        "userName": "a.johnson",
        "password": "QWERTY@92",
        "position": "Marketing Specialist",
        "unit": "Marketing",
        "manager": {
          "id": "111",
          "fullName": "Michael P.",
          "position": "Project manager",
          "mobile": "+13349283744",
          "emailId": "michp_23@gmail.com"
        },
        "address": {
          "street": "789 Pine Blvd",
          "city": "Cityville",
          "state": "TX",
          "zip": "44523"
        },
        "mobile": "+13384647423",
        "emailId": "alice.j@gmail.com",
        "profilePhoto": "/assets/pp1.png",
        "availedLeaves": {
          "paidLeave": 10,
          "sickLeave": 0,
          "maternityLeave": 100,
          "unpaidLeave": 0,
          "specialLeave": 4
        },
        "leaveStatus": {
          "approved": 100,
          "pending": 10,
          "rejected": 4
        },
        "leaveHistory": [
          {
            "leaveId": "L1",
            "leaveType": "Maternity Leave",
            "from": "1/2/2023",
            "to": "5/11/2023",
            "noOfDays": "100",
            "remark": "Medical leave due to maternity",
            "status": "Approved"
          },
          {
            "leaveId": "L2",
            "leaveType": "Special Leave",
            "from": "8/21/2023",
            "to": "8/24/2023",
            "noOfDays": "4",
            "remark": "Personal leave",
            "status": "Rejected"
          },
          {
            "leaveId": "L3",
            "leaveType": "Paid Leave",
            "from": "11/27/2023",
            "to": "11/28/2023",
            "noOfDays": "10",
            "remark": "Ill Health",
            "status": "Pending"
          }
        ]
      }
];

const totalLeavesDB=[
    {
        "id": "L01",
        "typeOfLeave": "Paid Leave",
        "noOfLeaves": 20
      },
      {
        "id": "L02",
        "typeOfLeave": "Sick Leave",
        "noOfLeaves": 10
      },
      {
        "id": "L03",
        "typeOfLeave": "Maternity Leave",
        "noOfLeaves": 150
      },
      {
        "id": "L04",
        "typeOfLeave": "Unpaid Leave",
        "noOfLeaves": 10
      },
      {
        "id": "L05",
        "typeOfLeave": "Special Leave",
        "noOfLeaves": 5
      }
];

const holidayCalendarDB=[
    {
        "date": "1/26/2023",
        "holiday": "Republic Day"
      },
      {
        "date": "3/08/2023",
        "holiday": "Holi"
      },
      {
        "date": "5/1/2023",
        "holiday": "May Day"
      },
      {
        "date": "6/29/2023",
        "holiday": "Bakri (Id-Ul-Zuha)"
      },
      {
        "date": "8/15/2023",
        "holiday": "Independence Day"
      },
      {
        "date": "9/19/2023",
        "holiday": "Ganesha Chaturthi"
      },
      {
        "date": "9/28/2023",
        "holiday": "Ganesh Visarjan Day"
      },
      {
        "date": "10/2/2023",
        "holiday": "Gandhi Jayanthi"
      },
      {
        "date": "10/24/2023",
        "holiday": "Vijayadashami"
      },
      {
        "date": "12/25/2023",
        "holiday": "Christmas"
      }
];

user={};

user.setUpDb=async()=>{
    let user=await connection.getEmpData();
    await user.deleteMany();
    let userdata=await user.insertMany(empDB);

    let leaves=await connection.getTotalLeavesData();
    await leaves.deleteMany();
    let leaveData=await leaves.insertMany(totalLeavesDB);

    let holidays=await connection.getHolidayData();
    await holidays.deleteMany();
    let holidayData=await holidays.insertMany(holidayCalendarDB);


    if (userdata && leaveData && holidayData) {
      return { userdata, leaveData, holidayData };
    }else{
        let err=new Error("Employees insertion failed");
        err.status=400;
        throw err;
    }
}

user.getAllUsers = async()=>{
    let model=await connection.getEmpData();
    let data=await model.find({}, {_id:0});
    if(data){
        return data;
    }else{
        let err=new Error("Employess not found..");
        throw err;
    }
};

user.getTotalLeaves=async()=>{
  let model=await connection.getTotalLeavesData();
  let data=await model.find({} , {_id:0});
  if(data){
    return data;
  }else{
    let err=new Error("Employess not found..");
    throw err;
}
}

user.getHolidayList=async()=>{
  let model=await connection.getHolidayData();
  let data=await model.find({} , {_id:0});
  if(data){
    return data;
  }else{
    let err=new Error("Employess not found..");
    throw err;
}
}

module.exports=user;