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
              private router:Router) {}
  
  onLogout(){
    this.authenticationService.logout();
  }


  ngOnInit() {
    this.authenticationService.getApplications()
    .subscribe(
      data=>{
      this.applications=data
      },

      error=>{
        this.onLogout()
      }
    )
  }

  onSelect(application){
    this.router.navigateByUrl('/application/'+application.id)
  }

  filter(event){
    const val = event.target.value;
    console.log(val);
  }

}
