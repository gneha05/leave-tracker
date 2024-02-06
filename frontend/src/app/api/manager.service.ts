import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  managerData:any;
  specificManager:any;

  constructor(private http:HttpClient) {
    this.getManagers().subscribe((data:any)=>{
      this.managerData=data;
    })
   }

   getManagers(){
    return this.http.get("http://localhost:4000/managers");
   }

   getManagerById(id:String){
      this.specificManager=this.managerData.find((mgr:any)=>mgr.id===id);
      // console.log(this.specificManager);
      const mgrName=this.specificManager.fullName;
      return mgrName;
   }
}
