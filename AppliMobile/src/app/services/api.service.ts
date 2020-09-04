import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from './../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  getApplications(){
    return this.http.get(`${apiUrl}/applications`)
  }


  getApplication(id){
    return this.http.get(`${apiUrl}/applications/`+id)
  }

  postCommand(requete){
    return this.http.post(`${apiUrl}/executecommand`, requete)
  }

  getUser(login){
    return this.http.get(`${apiUrl}/users/`+login)
  }
}
