import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  constructor(private loginService: LoginService,
              private router: Router) { }


  

  onSubmit(user){

    this.loginService.login(user)
    .subscribe(
      Response=>{
        let jwtToken = Response.headers.get('authorization')
        this.loginService.saveToken(jwtToken)
        this.router.navigate(['/home'])
      },

      error=>{
        //this.utils.presentToast("Bad Credentials!",'danger');
      }
    )
  }

}
