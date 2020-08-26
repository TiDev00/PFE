import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Application } from '../models/application';
import { UtilsService } from '../services/utils.service';


@Component({
  selector: 'app-applications',
  templateUrl: './applications.page.html',
  styleUrls: ['./applications.page.scss'],
})
export class ApplicationsPage implements OnInit{

  applications;
  user;
  app;
  searchText: string;
  

  constructor(private authenticationService:AuthenticationService,
              private router: Router, private route: ActivatedRoute) {}
  
  onLogout(){
    this.authenticationService.logout();
  }


  ngOnInit() {
    this.user = this.route.snapshot.data['user']
    this.app = this.route.snapshot.data['applications']
    this.applications = this.display(this.app, this.user.service.serviceName)
  }

  onSelect(application){
    this.router.navigateByUrl('/application/'+application.id)
  }

  display(apps: Application[], service: string):Application[]{
    return apps.filter(item => item.service.serviceName == service);
  }
}

  
