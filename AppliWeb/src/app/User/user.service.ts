import { User } from './user';
import { UserFilter } from './user-filter';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { host } from 'src/environments/environment';


@Injectable()
export class UserService {
  userList: User[] = [];
  api = `${host}/users`;

  constructor(private http: HttpClient) {
  }

  findByMatricule(id: string): Observable<User> {
    const url = `${this.api}/${id}`;
    const params = { matricule: id };
    return this.http.get<User>(url, {params});
  }

  load(filter: UserFilter): void {
    this.find(filter).subscribe(result => {
        this.userList = result;
      },
      err => {
        console.error('error loading', err);
      }
    );
  }

  find(filter: UserFilter): Observable<User[]> {
    const params = {
      'matricule': filter.matricule,
    };

    return this.http.get<User[]>(this.api, {params});
  }

  save(entity: User): Observable<User> {
    let params = new HttpParams();
    let url = '';
    url = `${this.api}`;
    return this.http.post<User>(url, entity, {params});
  }

  update(entity: User){
    let params = new HttpParams();
    let url = '';
    url = `${this.api}/${entity.matricule}`;
    params = new HttpParams().set('matricule', entity.matricule);
    return this.http.put<User>(url, entity, {params});
  }

  delete(entity: User): Observable<User> {
    let params = new HttpParams();
    let url = '';
    if (entity.matricule) {
      url = `${this.api}/${entity.matricule}`;
      params = new HttpParams().set('matricule', entity.matricule);
      return this.http.delete<User>(url, {params});
    }
    return null;
  }
}

