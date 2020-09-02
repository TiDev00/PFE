import { Action } from './action';
import { ActionFilter } from './action-filter';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { host } from './../../environments/environment';

@Injectable()
export class ActionService {
  actionList: Action[] = [];
  api = `${host}/actions`;

  constructor(private http: HttpClient) {
  }

  findById(id: string): Observable<Action> {
    const url = `${this.api}/${id}`;
    const params = { id: id };
    return this.http.get<Action>(url, {params});
  }

  load(filter: ActionFilter): void {
    this.find(filter).subscribe(result => {
        this.actionList = result;
      },
      err => {
        console.error('error loading', err);
      }
    );
  }

  find(filter: ActionFilter): Observable<Action[]> {
    const params = {
      'actionName': filter.actionName,
    };

    return this.http.get<Action[]>(this.api, {params});
  }

  save(entity: Action): Observable<Action> {
    let params = new HttpParams();
    let url = '';
    if (entity.id) {
      url = `${this.api}/${entity.id.toString()}`;
      params = new HttpParams().set('ID', entity.id.toString());
      return this.http.put<Action>(url, entity, {params});
    } else {
      url = `${this.api}`;
      return this.http.post<Action>(url, entity, {params});
    }
  }

  delete(entity: Action): Observable<Action> {
    let params = new HttpParams();
    let url = '';
    if (entity.id) {
      url = `${this.api}/${entity.id.toString()}`;
      params = new HttpParams().set('ID', entity.id.toString());
      return this.http.delete<Action>(url, {params});
    }
    return null;
  }

  loadActions(): Observable<Action[]>{
    return this.http.get<Action[]>(this.api)
  }
}

