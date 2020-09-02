import { Injectable } from '@angular/core';
import { ProcessService } from '../process/process.service';
import { Resolve } from '@angular/router';
import { Process } from '../process/process';

@Injectable({
  providedIn: 'root'
})
export class ProcessesResolverService implements Resolve<Process[]>{

  constructor(private processService: ProcessService) { }

  resolve(){
    return this.processService.loadprocesses()
  }
}