import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { host } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  
  constructor(private http: HttpClient,
              private router: Router) { }

  get isLoggedIn(){
    let token = localStorage.getItem('token')
    if(token){
      this.loggedIn.next(true)
      return this.loggedIn.asObservable()
    }
    this.loggedIn.next(false)
    return this.loggedIn.asObservable()
  }

  login(user){
    return this.http.post(`${host}/login`, user, {observe: 'response'})
  }

  saveToken(jwt:string){
    localStorage.setItem('token',jwt)
  }

  logout(){
    localStorage.removeItem('token')
  }
}
