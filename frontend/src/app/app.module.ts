import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SideNavigationComponent } from './side-navigation/side-navigation.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApplyLeaveComponent } from './apply-leave/apply-leave.component';
import { ManageLeaveComponent } from './manage-leave/manage-leave.component';
import { HolidayCalenderComponent } from './holiday-calender/holiday-calender.component';
import { ProfileComponent } from './profile/profile.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JsonPipe } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SideNavigationComponent,
    LoginComponent,
    DashboardComponent,
    ApplyLeaveComponent,
    ManageLeaveComponent,
    HolidayCalenderComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    JsonPipe
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
