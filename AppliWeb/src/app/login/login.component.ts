import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  constructor(private loginService: LoginService,
              private router: Router,
              private toast: ToastrService) { }


  

  onSubmit(user){

    this.loginService.login(user)
    .subscribe(
      Response=>{
        let jwtToken = Response.headers.get('authorization')
        this.loginService.saveToken(jwtToken)
        this.router.navigate(['/home'])
      },

      error=>{
        this.toast.error('Please try again', 'Bad credentials')
      }
    )
  }

}
