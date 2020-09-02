import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Server } from '../server/server';
import { ServerService } from '../server/server.service';

@Injectable({
  providedIn: 'root'
})
export class ServersResolverService implements Resolve<Server[]>{

  constructor(private serverService: ServerService) { }

  resolve(){
    return this.serverService.loadServers()
  }
}
