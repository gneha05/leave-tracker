import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  paramValue:string="";
  empLeaveData:any;

  constructor(private http:HttpClient) {
    this.getEmployees().subscribe((data:any)=>{
      this.empLeaveData=data;
    })
   }

  getEmployees(){
    return this.http.get("http://localhost:4000/Employees");    
  }

  
  getLeaveHistory(empId:string):any[]{
    // console.log(this.empLeaveData)
    if(this.empLeaveData){
      const employee=this.empLeaveData.find((emp:any)=>emp.id === empId);
      console.log(employee);
      
      if(employee && employee.leaveHistory){
        return employee.leaveHistory;
      }
    }
    return [];
  }

  normalizeString(str:String):String{
    return str.toLowerCase().replace(/\s/g,'');
  };

  //getting no of leaves for a particular leavetype
  getAvailedLeaves(empId:string,leaveType:string):number{
    const normalizedLeaveType=this.normalizeString(leaveType);
    const emp=this.empLeaveData.find((emp:any)=>emp.id===empId);
    if(emp && emp.availedLeaves){
      for(const key in emp.availedLeaves){
        if(this.normalizeString(key) === normalizedLeaveType){
          console.log("hii");
          return emp.availedLeaves[key];
        }
      }
    }
    return 0;
  }

  //getting no of leaves for all leave types
  getAllAvailedLeaves(empId:string):any[]{
    if(this.empLeaveData){
      const emp=this.empLeaveData.find((emp:any)=>emp.id === empId);
      if(emp && emp.availedLeaves){
        return emp.availedLeaves;
      }
    }
    return [];
  }

  getLeaveStatus(empId:string):any[]{
    if(this.empLeaveData){
      const emp=this.empLeaveData.find((emp:any)=>emp.id === empId);
      if(emp && emp.leaveStatus){
        return emp.leaveStatus;
      }
    }
    return [];
  }

  updateLeaveHistory(empId:string , updatedLeaveHist:any[]):Observable<any>{
    return this.http.put(`http://localhost:4000/employees/${empId}/update-leave-history` , updatedLeaveHist);
  }

  // deleteLeaveRecord(empId:string , deleteRec:any[]):Observable<any>{
  //   const updatedLeaveHist={
  //     ...this.empLeaveData.find((emp:any)=>emp.id === empId),
  //     leaveHistory:deleteRec
  //   };
  //   return this.http.put(`http://localhost:4000/employees/${empId}` , updatedLeaveHist);
  // }

  updateAvailedLeaves(empId:string , updatedAvlLeave:any[]):Observable<any>{
    return this.http.put(`http://localhost:4000/employees/${empId}/update-leave` , updatedAvlLeave);
  }

  updateLeaveStatus(empId:string , updatedLeaveStat:any[]):Observable<any>{
    return this.http.put(`http://localhost:4000/employees/${empId}/update-leave-status` , updatedLeaveStat);
  }

}
