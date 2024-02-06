import { Component, DoCheck, OnInit } from '@angular/core';
import { EmployeesService } from '../api/employees.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from '../shared/shared-data.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements DoCheck, OnInit {

  isNavbarReq:boolean= false;
  userId:any;

  empData:any;
  userName:any;
  desiredEmpName:any;
  constructor(private sharedDataService: SharedDataService, private router:Router){}
 

  ngOnInit(): void {
    this.sharedDataService.currentUserName.subscribe(userName => {
      this.userName = userName;

      console.log(this.userName);
      
    });
    // console.log(this.userName);

    
  }

  ngDoCheck(): void {
      let currentUrl=this.router.url;
      // console.log(currentUrl);
      if(currentUrl=='/login'){
        this.isNavbarReq=false;
      }else{
        this.isNavbarReq=true;
      }
     }
 


  onToggleMenu(){
    
  }
}
