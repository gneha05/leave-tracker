import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HolidaysService {

  constructor(private http:HttpClient) { }
  getHolidayList(){
    return this.http.get("http://localhost:4000/holidays");
  }
}
