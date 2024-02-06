import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EmployeesService } from '../api/employees.service';
import { Router } from '@angular/router';
import { authGuard } from '../guards/auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

constructor(private empServ:EmployeesService , private router:Router){}

  loginForm : FormGroup =new FormGroup({
    email:new FormControl(),
    password:new FormControl(),
    loggedIn:new FormControl()
  });

  login():void{
    console.log("enter login");
    
    this.empServ.getEmployees().subscribe((res:any)=>{
      const user=res.find((e:any)=>{        
        return e.emailId===this.loginForm.value.email && e.password===this.loginForm.value.password
      });
      if(user){
        console.log(`${user.userName} successfully logged in`);
        sessionStorage.setItem('userID' , JSON.stringify(user.id));
        this.loginForm.reset();
        this.router.navigate(['/dashboard', user.userName]); 
      }else{
        console.log("error");
        
      }
    } , err=>{
      alert("Something went wrong...")
    })
  }
}
