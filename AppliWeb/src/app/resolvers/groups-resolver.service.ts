import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Group } from '../group/group';
import { GroupService } from '../group/group.service';

@Injectable({
  providedIn: 'root'
})
export class GroupsResolverService implements Resolve<Group[]>{

  constructor(private groupService: GroupService) { }

  resolve(){
    return this.groupService.loadServices();
  }
}