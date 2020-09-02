import { Process } from './process';
import { ProcessFilter } from './process-filter';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { host } from 'src/environments/environment';

const headers = new HttpHeaders().set('Accept', 'application/json');

@Injectable()
export class ProcessService {
  processList: Process[] = [];
  api = `${host}/processes`;

  constructor(private http: HttpClient) {
  }

  findById(id: string): Observable<Process> {
    const url = `${this.api}/${id}`;
    const params = { id: id };
    return this.http.get<Process>(url, {params, headers});
  }

  load(filter: ProcessFilter): void {
    this.find(filter).subscribe(result => {
        this.processList = result;
      },
      err => {
        console.error('error loading', err);
      }
    );
  }

  find(filter: ProcessFilter): Observable<Process[]> {
    const params = {
      'processName': filter.processName,
    };

    return this.http.get<Process[]>(this.api, {params, headers});
  }

  save(entity: Process): Observable<Process> {
    let params = new HttpParams();
    let url = '';
    if (entity.id) {
      url = `${this.api}/${entity.id.toString()}`;
      params = new HttpParams().set('ID', entity.id.toString());
      return this.http.put<Process>(url, entity, {headers, params});
    } else {
      url = `${this.api}`;
      return this.http.post<Process>(url, entity, {headers, params});
    }
  }

  delete(entity: Process): Observable<Process> {
    let params = new HttpParams();
    let url = '';
    if (entity.id) {
      url = `${this.api}/${entity.id.toString()}`;
      params = new HttpParams().set('ID', entity.id.toString());
      return this.http.delete<Process>(url, {headers, params});
    }
    return null;
  }

  loadprocesses(): Observable<Process[]>{
    return this.http.get<Process[]>(this.api)
  }
}

