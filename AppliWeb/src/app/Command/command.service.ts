import { Command } from './command';
import { CommandFilter } from './command-filter';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { host } from 'src/environments/environment';



@Injectable()
export class CommandService {
  commandList: Command[] = [];
  api = `${host}/commands`;

  constructor(private http: HttpClient) {
  }

  findById(id: string): Observable<Command> {
    const url = `${this.api}/${id}`;
    const params = { id: id };
    return this.http.get<Command>(url, {params});
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

    return this.http.get<Command[]>(this.api, {params});
  }

  save(entity: Command): Observable<Command> {
    let params = new HttpParams();
    let url = '';
    if (entity.id) {
      url = `${this.api}/${entity.id.toString()}`;
      params = new HttpParams().set('ID', entity.id.toString());
      return this.http.put<Command>(url, entity, {params});
    } else {
      url = `${this.api}`;
      return this.http.post<Command>(url, entity, {params});
    }
  }

  delete(entity: Command): Observable<Command> {
    let params = new HttpParams();
    let url = '';
    if (entity.id) {
      url = `${this.api}/${entity.id.toString()}`;
      params = new HttpParams().set('ID', entity.id.toString());
      return this.http.delete<Command>(url, {params});
    }
    return null;
  }
}

