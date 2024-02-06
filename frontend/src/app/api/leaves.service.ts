import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LeavesService {

  totalLeavesData:any;

  constructor(private http:HttpClient) {
    this.getTotalLeaves().subscribe((data:any)=>{
      this.totalLeavesData=data;
    })
   }

   getTotalLeaves(){
    return this.http.get("http://localhost:4000/totalLeaves");
   }

   getNoOfLeaves(leaveType:string){
    const leave=this.totalLeavesData.find((item:any)=>item.typeOfLeave==leaveType);
    return leave?leave.noOfLeaves:0;
   }
}
