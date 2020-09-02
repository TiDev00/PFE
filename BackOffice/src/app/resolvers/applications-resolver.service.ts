import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Application } from '../application/application';
import { ApplicationService } from '../application/application.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsResolverService implements Resolve<Application[]>{

  constructor(private applicationService: ApplicationService) { }

  resolve(){
    return this.applicationService.loadApplications()
  }
}
