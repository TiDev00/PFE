import { Log } from './log';
import { LogFilter } from './log-filter';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { host } from 'src/environments/environment';

@Injectable()
export class LogService {
  logList: Log[] = [];
  api = `${host}/logs`;

  constructor(private http: HttpClient) {
  }

  findById(id: string): Observable<Log> {
    const url = `${this.api}/${id}`;
    const params = { id: id };
    return this.http.get<Log>(url, {params});
  }

  load(filter: LogFilter): void {
    this.find(filter).subscribe(result => {
        this.logList = result;
      },
      err => {
        console.error('error loading', err);
      }
    );
  }

  find(filter: LogFilter): Observable<Log[]> {
    const params = {
      'user': filter.user,
    };

    return this.http.get<Log[]>(this.api, {params});
  }

  save(entity: Log): Observable<Log> {
    let params = new HttpParams();
    let url = '';
    if (entity.id) {
      url = `${this.api}/${entity.id.toString()}`;
      params = new HttpParams().set('ID', entity.id.toString());
      return this.http.put<Log>(url, entity, {params});
    } else {
      url = `${this.api}`;
      return this.http.post<Log>(url, entity, {params});
    }
  }

  delete(entity: Log): Observable<Log> {
    let params = new HttpParams();
    let url = '';
    if (entity.id) {
      url = `${this.api}/${entity.id.toString()}`;
      params = new HttpParams().set('ID', entity.id.toString());
      return this.http.delete<Log>(url, {params});
    }
    return null;
  }
}

