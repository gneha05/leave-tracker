import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApplyLeaveComponent } from './apply-leave/apply-leave.component';
import { ManageLeaveComponent } from './manage-leave/manage-leave.component';
import { HolidayCalenderComponent } from './holiday-calender/holiday-calender.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
        {path:'' , component:DashboardComponent , canActivate:[authGuard]},
        {path:"login" , component:LoginComponent },
        {path:"dashboard/:userName" , component:DashboardComponent , canActivate:[authGuard]},
        {path:"apply-leave/:userName" , component:ApplyLeaveComponent , canActivate:[authGuard]},
        {path:"manage-leave/:userName" , component:ManageLeaveComponent , canActivate:[authGuard]},
        {path:"holiday-calender" , component:HolidayCalenderComponent, canActivate:[authGuard]},
        {path:"profile/:userName" , component:ProfileComponent , canActivate:[authGuard] }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
