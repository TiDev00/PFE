import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Application } from '../models/application';
import * as decoder from 'jwt-decode';


@Component({
  selector: 'app-applications',
  templateUrl: './applications.page.html',
  styleUrls: ['./applications.page.scss'],
})
export class ApplicationsPage implements OnInit {

  applications;
  user;
  array: Application[];
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
      this.applications=this.restriction(data)
      }
    )
  }

  onSelect(application){
    this.router.navigateByUrl('/application/'+application.id)
  }

  restriction(array){
    let token = localStorage.getItem('token')
    var decoded = decoder(token);
    this.apiService.getUser(decoded.sub)
    .subscribe(
      data=>{
        this.user=data
      }
    )
    return array.filter((application) => {
      return application.service.serviceName == 'EAI'
    })
  }

}

  
