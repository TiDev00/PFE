import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  createUser(user: Object): Observable<Object> {
    return this.http.post(`${apiUrl}/users`, user);
  }

  getUsersList(): Observable<any> {
    return this.http.get(`${apiUrl}/users`);
  }

  getUser(matricule: string): Observable<any>{
    return this.http.get(`${apiUrl}/users/${matricule}`);
  }

  updateUser(matricule: string, value: any): Observable<Object> {
    return this.http.put(`${apiUrl}/users/${matricule}`, value);
  }

  deleteUser(matricule: string): Observable<any> {
    return this.http.delete(`${apiUrl}/users/${matricule}`, { responseType: 'text' });
  }

}
