import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedDataService } from '../shared/shared-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
userName:any;
  userId:any;

constructor(private a_route:ActivatedRoute , private sharedDataService: SharedDataService){}

  ngOnInit(): void {
    this.userId=sessionStorage.getItem('userID');
    console.log(this.userId);
    
    this.a_route.params.subscribe(params=>{
      this.userName=params['userName'];
      console.log(this.userName);

      sessionStorage.setItem('userName' , this.userName);

      this.sharedDataService.setUserName(this.userName);
      
    })
  }

}
