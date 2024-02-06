import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  
  isLoggedIn(){
    return typeof sessionStorage !== 'undefined' && sessionStorage.getItem('userID') !== null;
    
  }
}
