import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ApiService } from '../services/api.service';
import * as decoder from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserResolveService implements Resolve<any>{

  constructor(private apiService: ApiService) { }

  resolve(){
    let token = localStorage.getItem('token')
    var decoded = decoder(token)
    return this.apiService.getUser(decoded.sub)
  }
}
