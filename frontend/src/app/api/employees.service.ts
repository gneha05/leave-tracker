import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

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
    if(this.empLeaveData){
      const employee=this.empLeaveData.find((emp:any)=>emp.id === empId);
      console.log(employee);
      
      if(employee && employee.leaveHistory){
        return employee.leaveHistory;
      }
    }
    return [];
  }

}
