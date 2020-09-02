import { Group } from './group';
import { GroupFilter } from './group-filter';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { host } from 'src/environments/environment';

const headers = new HttpHeaders().set('Accept', 'application/json');

@Injectable()
export class GroupService {
  groupList: Group[] = [];
  api = `${host}/services`;

  constructor(private http: HttpClient) {
  }

  findById(id: string): Observable<Group> {
    const url = `${this.api}/${id}`;
    const params = { id: id };
    return this.http.get<Group>(url, {params, headers});
  }

  load(filter: GroupFilter): void {
    this.find(filter).subscribe(result => {
        this.groupList = result;
      },
      err => {
        console.error('error loading', err);
      }
    );
  }

  find(filter: GroupFilter): Observable<Group[]> {
    const params = {
      'serviceName': filter.serviceName,
    };

    return this.http.get<Group[]>(this.api, {params, headers});
  }

  save(entity: Group): Observable<Group> {
    let params = new HttpParams();
    let url = '';
    if (entity.id) {
      url = `${this.api}/${entity.id.toString()}`;
      params = new HttpParams().set('ID', entity.id.toString());
      return this.http.put<Group>(url, entity, {headers, params});
    } else {
      url = `${this.api}`;
      return this.http.post<Group>(url, entity, {headers, params});
    }
  }

  delete(entity: Group): Observable<Group> {
    let params = new HttpParams();
    let url = '';
    if (entity.id) {
      url = `${this.api}/${entity.id.toString()}`;
      params = new HttpParams().set('ID', entity.id.toString());
      return this.http.delete<Group>(url, {headers, params});
    }
    return null;
  }

  loadServices(): Observable<Group[]>{
    return this.http.get<Group[]>(this.api)
  }
}

