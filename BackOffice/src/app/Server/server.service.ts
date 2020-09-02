import { Server } from './server';
import { ServerFilter } from './server-filter';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { host } from 'src/environments/environment';

const headers = new HttpHeaders().set('Accept', 'application/json');

@Injectable()
export class ServerService {
  serverList: Server[] = [];
  api = `${host}/servers`;

  constructor(private http: HttpClient) {
  }

  findById(id: string): Observable<Server> {
    const url = `${this.api}/${id}`;
    const params = { id: id };
    return this.http.get<Server>(url, {params, headers});
  }

  load(filter: ServerFilter): void {
    this.find(filter).subscribe(result => {
        this.serverList = result;
      },
      err => {
        console.error('error loading', err);
      }
    );
  }

  find(filter: ServerFilter): Observable<Server[]> {
    const params = {
      'serverName': filter.serverName,
    };

    return this.http.get<Server[]>(this.api, {params, headers});
  }

  save(entity: Server): Observable<Server> {
    let params = new HttpParams();
    let url = '';
    if (entity.id) {
      url = `${this.api}/${entity.id.toString()}`;
      params = new HttpParams().set('ID', entity.id.toString());
      return this.http.put<Server>(url, entity, {headers, params});
    } else {
      url = `${this.api}`;
      return this.http.post<Server>(url, entity, {headers, params});
    }
  }

  delete(entity: Server): Observable<Server> {
    let params = new HttpParams();
    let url = '';
    if (entity.id) {
      url = `${this.api}/${entity.id.toString()}`;
      params = new HttpParams().set('ID', entity.id.toString());
      return this.http.delete<Server>(url, {headers, params});
    }
    return null;
  }

  loadServers(): Observable<Server[]>{
    return this.http.get<Server[]>(this.api)
  }
}

