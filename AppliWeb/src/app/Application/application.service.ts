import { Application } from './application';
import { ApplicationFilter } from './application-filter';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { host } from 'src/environments/environment';


@Injectable()
export class ApplicationService {
  applicationList: Application[] = [];
  api = `${host}/applications`;

  constructor(private http: HttpClient) {
  }

  findById(id: string): Observable<Application> {
    const url = `${this.api}/${id}`;
    const params = { id: id };
    return this.http.get<Application>(url, {params});
  }

  load(filter: ApplicationFilter): void {
    this.find(filter).subscribe(result => {
        this.applicationList = result;
      },
      err => {
        console.error('error loading', err);
      }
    );
  }

  find(filter: ApplicationFilter): Observable<Application[]> {
    const params = {
      'appName': filter.appName,
    };

    return this.http.get<Application[]>(this.api, {params});
  }

  save(entity: Application): Observable<Application> {
    let params = new HttpParams();
    let url = '';
    if (entity.id) {
      url = `${this.api}/${entity.id.toString()}`;
      params = new HttpParams().set('ID', entity.id.toString());
      return this.http.put<Application>(url, entity);
    } else {
      url = `${this.api}`;
      return this.http.post<Application>(url, entity);
    }
  }

  delete(entity: Application): Observable<Application> {
    let params = new HttpParams();
    let url = '';
    if (entity.id) {
      url = `${this.api}/${entity.id.toString()}`;
      params = new HttpParams().set('ID', entity.id.toString());
      return this.http.delete<Application>(url, {params});
    }
    return null;
  }

  loadApplications(): Observable<Application[]>{
    return this.http.get<Application[]>(this.api)
  }
}

