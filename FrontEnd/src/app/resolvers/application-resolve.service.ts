import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationResolveService implements Resolve<any>{

  constructor(private apiService: ApiService) { }

  resolve(){
    return this.apiService.getApplications()
  }
}
