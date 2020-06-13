import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';




@Injectable({
  providedIn: 'root'
})


export class AuthenticationService {

  private host:string="http://localhost:8081";
  private jwtToken=null;
  

  constructor(private http:HttpClient, private router:Router) {  }


  login(form){
    return this.http.post(this.host+"/login",form, { observe: 'response' })
  }

  
  saveToken(jwt:string){
    localStorage.setItem('token',jwt)
  }


  loadToken(){
    this.jwtToken=localStorage.getItem('token')
  }


  getApplications(){
    if(this.jwtToken==null) this.loadToken();
    return this.http.get(this.host+"/applications", 
    {headers: new HttpHeaders({'Authorization': this.jwtToken})})
  }


  getApplication(id){
    if(this.jwtToken==null) this.loadToken()
    return this.http.get(this.host+"/applications/"+id, 
    {headers: new HttpHeaders({'Authorization': this.jwtToken})})

  }


  logout(){
    this.jwtToken=null;
    localStorage.removeItem("token")
    this.router.navigateByUrl('/login')
  }
}
