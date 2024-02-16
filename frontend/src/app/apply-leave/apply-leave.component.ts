import { Component, OnInit  } from '@angular/core';
import { NgbAlertModule, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { DatePipe, JsonPipe } from '@angular/common';
import { EmployeesService } from '../api/employees.service';
import { LeavesService } from '../api/leaves.service';
import { ActivatedRoute } from '@angular/router';
import { HolidaysService } from '../api/holidays.service';
import { SharedDataService } from '../shared/shared-data.service';
import { ManagerService } from '../api/manager.service';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrl: './apply-leave.component.css'
})
export class ApplyLeaveComponent implements OnInit {

  employeeData:any;
  totalLeaveData:any;

  desiredEmpId:any;
  username:any;

  managersName:any;
  selectedLeaveType:any;
  leaveBal:any;
  leaveHistory:any;
  noOfLeaves:any;
  availLeaves:any;
  updatedAvailLeaves:any;
  allAvailedLeaves:any;
  leaveStatus:any;
  holidayList:any[]=[];
  
  min: Date = new Date(2023, 0, 1);   // January 1, 2023
  max: Date = new Date(2024, 11, 31); // December 31, 2024

  leaveItems:string[]=[
    "Paid Leave" , "Sick Leave" ,"Maternity Leave" , "Unpaid Leave" ,"Special Leave"
  ];

  modelFrom!: NgbDateStruct;
  modelTo!: NgbDateStruct;

  leaveAppForm: FormGroup = this.fb.group({});

  constructor(private empServ:EmployeesService , private  leaveServ:LeavesService, private holidayServ:HolidaysService, private fb:FormBuilder, private sharedDataService: SharedDataService, private mgrServ:ManagerService , private datePipe:DatePipe ){}

  
  ngOnInit(): void {
    
    this.leaveAppForm=this.fb.group({
      managerName:[{value:'' , disabled:true}],
      leaveBalance:[{value:'' , disabled:true}],
      leaveType:[{value:this.selectedLeaveType}],
      from:[{value:''}],
      to:[{value:''}],
      noOfDays:[{value:'' , disabled:true}],
      remark:[]
    });

    this.sharedDataService.currentUserName.subscribe(userName => {
      this.username = userName;
      console.log(this.username);
    });

    this.getEmployeeApi();
    this.getLeavesApi();
    this.subscribeToDateChanges();
    this.getHolidays();

  }

  getEmployeeApi(){ 
      this.empServ.getEmployees().subscribe((empData=>{
      this.employeeData=empData;
      console.log(this.employeeData);
      const desiredEmp = this.employeeData.find((emp:any)=>emp.userName==this.username);
      // console.log(desiredEmp);
      this.desiredEmpId=desiredEmp.id;
      console.log(this.desiredEmpId);
      console.log(typeof(this.desiredEmpId))
      
      
      if(desiredEmp){
        const mgrId=desiredEmp.managerId;
        console.log(mgrId);
        
        this.managersName=this.mgrServ.getManagerById(mgrId);
        console.log(this.managersName);

        
    this.leaveHistory=this.empServ.getLeaveHistory(this.desiredEmpId);
    console.log(this.leaveHistory);
      }

      this.leaveAppForm.patchValue({
        managerName: this.managersName
      });
    }));

    
  }

  getLeavesApi(){
    this.leaveServ.getTotalLeaves().subscribe((data:any)=>{
      this.totalLeaveData=data;
      console.log(this.totalLeaveData);
      
    })
  }

  subscribeToDateChanges():void{
    const fromControl=this.leaveAppForm.get('from');
    const toControl=this.leaveAppForm.get('to');
    const noOfDaysControl=this.leaveAppForm.get('noOfDays');
    
    if(fromControl && toControl && noOfDaysControl){
      fromControl.valueChanges.subscribe(()=>{
        this.calculateNoOfDays();
      });

      toControl.valueChanges.subscribe(()=>{
        this.calculateNoOfDays();
      });
    }
  }

  calculateNoOfDays():void{
    const from=this.leaveAppForm.get('from')?.value;
    const to=this.leaveAppForm.get('to')?.value;
    console.log(from);
    console.log(to);
    

    if(from && to){
      const businessDays=this.calculateBusinessDays(from,to);
      this.noOfLeaves=businessDays;
      console.log(businessDays);
      

      this.leaveAppForm.patchValue({
        noOfDays:businessDays
      });

      //updatingAvailLeaves
      this.updatedAvailLeaves=this.availLeaves + this.noOfLeaves;
      console.log(this.updatedAvailLeaves);
      this.updateAvailedLeave();

      //updating leave Status
      this.updateLeaveStatus();

      //updating leave balance
      this.leaveBal-=this.noOfLeaves;
      console.log(this.leaveBal);
      
      
    }

  }

  updateAvailedLeave():void{
    this.allAvailedLeaves=this.empServ.getAllAvailedLeaves(this.desiredEmpId);
    console.log(this.allAvailedLeaves);
    
    const formattedLeaveType=this.convertToCamelcase(this.selectedLeaveType);
    console.log(formattedLeaveType);

    if(Object.prototype.hasOwnProperty.call(this.allAvailedLeaves , formattedLeaveType)){
      (this.allAvailedLeaves as any)[formattedLeaveType]=this.updatedAvailLeaves;
      
    }else{
      console.log("property not found...");
      
    }
    
  }

  convertToCamelcase(selectedLeaveType:string):string{
    const words=selectedLeaveType.split(' ');
    const camelCaseString=words.map((word,index)=>{
      if(index==0){
        return word.toLowerCase();
      }else{
        return word.charAt(0).toUpperCase()+word.slice(1).toLowerCase();
      }
    }).join('');
    return camelCaseString;
  }

  updateLeaveStatus():void{
    this.leaveStatus=this.empServ.getLeaveStatus(this.desiredEmpId);
    this.leaveStatus.pending+=this.noOfLeaves;
    console.log(this.leaveStatus);
    
  }

  calculateBusinessDays(startDate:any , endDate:any):number{
    let businessDays=0;

  const startYear = startDate.year;
  const startMonth = startDate.month - 1; // Adjust for zero-based month
  const startDay = startDate.day;

  const endYear = endDate.year;
  const endMonth = endDate.month - 1; // Adjust for zero-based month
  const endDay = endDate.day;

  let currentDate = new Date(startYear, startMonth, startDay);
  const endDateObj = new Date(endYear, endMonth, endDay);
  console.log(startDate);
  console.log(endDate);

  console.log(currentDate);
    
    while(currentDate <= endDateObj){
      if(!this.isWeekend(currentDate)){
        businessDays++;
      }
      currentDate.setDate(currentDate.getDate()+1);
    }
    return businessDays;
  }

  isWeekend(date:Date):boolean{
    const day=date.getDay();
    if(day==0 || day==6){
      return true;
    }
    const formattedDate=this.datePipe.transform(date , 'M/d/yyyy');
    return this.holidayList.some(holiday=>holiday.date === formattedDate);
  }

  getHolidays(){
    this.holidayServ.getHolidayList().subscribe((data:any)=>{
      this.holidayList=data;
    });
  }

  getLeaveBalance():void{
    const leaveType=this.selectedLeaveType;
    const totLeaves=this.leaveServ.getNoOfLeaves(leaveType);
    console.log(totLeaves);

    this.availLeaves=this.empServ.getAvailedLeaves(this.desiredEmpId , leaveType);
    console.log(this.desiredEmpId);
    console.log(this.availLeaves);
    this.leaveBal=totLeaves-this.availLeaves;
    console.log(this.leaveBal);
    this.leaveAppForm.patchValue({
      leaveBalance:this.leaveBal
    })
    
  }

  onLeaveTypeChange(event: any): void{
    // console.log(value);
    this.selectedLeaveType=event.target.value;
    console.log(this.selectedLeaveType);
    
    this.leaveAppForm.patchValue({
      leaveType:this.selectedLeaveType
    });
    this.getLeaveBalance();
    
  }

  generateLeaveId():string{
    const lastLeave=this.leaveHistory[this.leaveHistory.length-1];
    const lastLeaveId=lastLeave?lastLeave.leaveId:'L0';
    
    const numericPart=parseInt(lastLeaveId.substring(1),10);
    const newNumericPart=numericPart+1;

    const newLeaveId='L'+newNumericPart;
    return newLeaveId;
  }

  submitForm(data:any):void{
    this.getLeaveBalance();

    setTimeout(()=>{
      const formData={
        ...data,
        from: new Date(data.from.year, data.from.month - 1, data.from.day).toISOString(),
        to: new Date(data.to.year, data.to.month - 1, data.to.day).toISOString(),
        noOfDays:this.noOfLeaves,
        status:"Pending",
        leaveId:this.generateLeaveId(),
        remark:this.leaveAppForm.get('remark')?.value
      };

      this.leaveHistory.push(formData);
      console.log(this.leaveHistory);
      this.leaveAppForm.markAllAsTouched();

      this.empServ.updateAvailedLeaves(this.desiredEmpId , this.allAvailedLeaves).subscribe(()=>{
        
        console.log("Availed leaves data updated successfully");
        
      }, err=>{
        console.log("Error updating availed leaves");
        
      });

      this.empServ.updateLeaveStatus(this.desiredEmpId , this.leaveStatus).subscribe(()=>{
        console.log("Leave status updated successfully");
        
      }, err=>{
        console.log("Error updating leave status");
        
      });

      this.empServ.updateLeaveHistory(this.desiredEmpId , this.leaveHistory).subscribe(()=>{
        console.log("successfully updated leave history");
        
      }, err=>{
        console.log("Error updating leave history");
        
      });
      
    } , 100);
  }

  showInfo():void{

  }

  clearForm():void{
    this.leaveAppForm.reset();
  }
}
