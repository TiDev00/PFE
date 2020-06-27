import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../../environments/environment'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private jwtToken=null;
  
  constructor(private http:HttpClient, private router: Router) { }

  login(user){
    return this.http.post<any>(`${baseUrl}/login`,user, { observe: 'response' })
    .subscribe(
      Response=>{
        let jwtToken = Response.headers.get('authorization');
        this.saveToken(jwtToken);
        this.router.navigateByUrl('/home')
      },

      error=>{
        alert("Bad Credentials!")
      }
    )
  }

  saveToken(jwt:string){
    localStorage.setItem('token',jwt)
  }


  loadToken(){
    this.jwtToken = localStorage.getItem('token')
  }
}
