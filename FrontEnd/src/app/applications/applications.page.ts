import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';



@Component({
  selector: 'app-applications',
  templateUrl: './applications.page.html',
  styleUrls: ['./applications.page.scss'],
})
export class ApplicationsPage implements OnInit {

  applications;
  searchText: string;
  

  constructor(private authenticationService:AuthenticationService,
              private router: Router, private apiService: ApiService) {}
  
  onLogout(){
    this.authenticationService.logout();
  }


  ngOnInit() {
    this.apiService.getApplications()
    .subscribe(
      data=>{
      this.applications=data
      }
    )
  }

  onSelect(application){
    this.router.navigateByUrl('/application/'+application.id)
  }

  

}

  
