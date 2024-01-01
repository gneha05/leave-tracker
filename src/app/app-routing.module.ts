import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApplyLeaveComponent } from './apply-leave/apply-leave.component';
import { ManageLeaveComponent } from './manage-leave/manage-leave.component';
import { HolidayCalenderComponent } from './holiday-calender/holiday-calender.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path:"" , component:DashboardComponent},
  {path:"dashboard" , component:DashboardComponent},
  {path:"apply-leave" , component:ApplyLeaveComponent},
  {path:"manage-leave" , component:ManageLeaveComponent},
  {path:"holiday-calender" , component:HolidayCalenderComponent},
  {path:"profile" , component:ProfileComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
