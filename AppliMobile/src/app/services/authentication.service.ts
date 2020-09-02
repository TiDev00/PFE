import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { apiUrl } from './../../environments/environment'



@Injectable({
  providedIn: 'root'
})


export class AuthenticationService {
  
  constructor(private http:HttpClient, private router:Router) {  }

  login(user){
    return this.http.post(`${apiUrl}/login`,user, { observe: 'response' })
  }

  
  saveToken(jwt:string){
    localStorage.setItem('token',jwt)
  }


  logout(){
    localStorage.removeItem("token")
    this.router.navigateByUrl('/login')
  }
}
