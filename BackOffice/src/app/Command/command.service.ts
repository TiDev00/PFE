import { Command } from './command';
import { CommandFilter } from './command-filter';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const headers = new HttpHeaders().set('Accept', 'application/json');

@Injectable()
export class CommandService {
  commandList: Command[] = [];
  api = 'http://localhost:8081/commands';

  constructor(private http: HttpClient) {
  }

  findById(id: string): Observable<Command> {
    const url = `${this.api}/${id}`;
    const params = { id: id };
    return this.http.get<Command>(url, {params, headers});
  }

  load(filter: CommandFilter): void {
    this.find(filter).subscribe(result => {
        this.commandList = result;
      },
      err => {
        console.error('error loading', err);
      }
    );
  }

  find(filter: CommandFilter): Observable<Command[]> {
    const params = {
      'commandName': filter.commandName,
    };

    return this.http.get<Command[]>(this.api, {params, headers});
  }

  save(entity: Command): Observable<Command> {
    let params = new HttpParams();
    let url = '';
    if (entity.id) {
      url = `${this.api}/${entity.id.toString()}`;
      params = new HttpParams().set('ID', entity.id.toString());
      return this.http.put<Command>(url, entity, {headers, params});
    } else {
      url = `${this.api}`;
      return this.http.post<Command>(url, entity, {headers, params});
    }
  }

  delete(entity: Command): Observable<Command> {
    let params = new HttpParams();
    let url = '';
    if (entity.id) {
      url = `${this.api}/${entity.id.toString()}`;
      params = new HttpParams().set('ID', entity.id.toString());
      return this.http.delete<Command>(url, {headers, params});
    }
    return null;
  }
}

