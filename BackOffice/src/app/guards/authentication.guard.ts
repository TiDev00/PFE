import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  
  constructor(private router: Router){} 

  canActivate(): boolean{
    if (localStorage.getItem('token') != null){
      return true
    }
    alert("Not logged in")
    this.router.navigateByUrl('/login')
    return false
  }
  
}
