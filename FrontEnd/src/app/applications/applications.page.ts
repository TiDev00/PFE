import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.page.html',
  styleUrls: ['./applications.page.scss'],
})
export class ApplicationsPage implements OnInit {

  applications;

  constructor(private authenticationService:AuthenticationService,
              private router:Router) { }
  
  onLogout(){
    this.authenticationService.logout();
    this.router.navigateByUrl('/login')
  }

  ngOnInit() {
    this.authenticationService.getapplications()
    .subscribe(
      data=>{
      this.applications=data
      },

      error=>{
        this.onLogout()
      }
    )
  }

}
