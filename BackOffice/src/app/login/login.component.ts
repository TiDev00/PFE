import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  formGroup: FormGroup;

  constructor(private authenticationService: AuthenticationService,
              private router: Router) { }
  
  ngOnInit(){
    this.initForm()
  }

  initForm(){
    this.formGroup = new FormGroup({
      matricule: new FormControl('',[Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }
  
  onSubmit(){
    if(this.formGroup.valid){
      this.authenticationService.login(this.formGroup.value)
      .subscribe(
        Response=>{
          let jwtToken = Response.headers.get('authorization');
          this.authenticationService.saveToken(jwtToken);
          this.router.navigateByUrl('/home')
        },
  
        error=>{
          alert("Bad credentials!")
        }
      )
    }
  }

}
