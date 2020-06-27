import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class ProcessResolveService implements Resolve<any>{

  constructor(private apiServive: ApiService) { }

  resolve(route: ActivatedRouteSnapshot){
    let id = route.paramMap.get('id');
    return this.apiServive.getApplication(id)
  }
}
