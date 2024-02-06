import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApplyLeaveComponent } from './apply-leave/apply-leave.component';
import { ManageLeaveComponent } from './manage-leave/manage-leave.component';
import { HolidayCalenderComponent } from './holiday-calender/holiday-calender.component';
import { ProfileComponent } from './profile/profile.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe, JsonPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
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
    JsonPipe,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
