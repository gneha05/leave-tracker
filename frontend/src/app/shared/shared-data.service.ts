import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private userNameSource = new BehaviorSubject<string>('');
  currentUserName = this.userNameSource.asObservable();

  setUserName(userName: string) {
    this.userNameSource.next(userName);
  }}
