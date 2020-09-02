import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Action } from '../action/action';
import { ActionService } from '../action/action.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActionsResolverService implements Resolve<Action[]>{

  constructor(private actionService: ActionService) { }

  resolve(){
    return this.actionService.loadActions()
  }
}
