import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UtilsService } from '../services/utils.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {

  constructor(private authenticationService: AuthenticationService,
              private utils: UtilsService,
              private router: Router) {}

  onSubmit(user){

    this.authenticationService.login(user)
    .subscribe(
      Response=>{
        let jwtToken = Response.headers.get('authorization');
        this.authenticationService.saveToken(jwtToken);
        this.router.navigateByUrl('/applications')
      },

      error=>{
        this.utils.presentToast("Bad Credentials!",'danger');
      }
    )
  }

}
