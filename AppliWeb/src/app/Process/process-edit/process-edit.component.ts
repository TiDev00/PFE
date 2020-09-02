import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProcessService } from '../process.service';
import { Process } from '../process';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Server } from 'src/app/server/server';
import { Application } from 'src/app/application/application';

@Component({
  selector: 'app-process-edit',
  templateUrl: './process-edit.component.html'
})
export class ProcessEditComponent implements OnInit {

  id: string;
  process: Process;
  feedback: any = {};
  loadedServers: Server[];
  loadedApplications: Application[]

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private processService: ProcessService) {
  }

  ngOnInit() {
    this
      .route
      .params
      .pipe(
        map(p => p.id),
        switchMap(id => {
          if (id === 'new') { return of(new Process()); }
          return this.processService.findById(id);
        })
      )
      .subscribe(process => {
          this.process = process;
          this.feedback = {};
        },
        err => {
          this.feedback = {type: 'warning', message: 'Error loading'};
        }
      );

      this.loadedApplications = this.route.snapshot.data['applications']
      this.loadedServers = this.route.snapshot.data['servers']
  }

  save() {
    const object = {
      id: this.process.id,
      processName: this.process.processName,
      descProcess: this.process.descProcess,
      application: {id: this.process.application},
      server: {id: this.process.server}
    }
    const strObject = JSON.stringify(object);
    this.processService.save(JSON.parse(strObject)).subscribe(
      process => {
        this.process = process;
        this.feedback = {type: 'success', message: 'Save was successful!'};
        setTimeout(() => {
          this.router.navigate(['/processes']);
        }, 1000);
      },
      err => {
        this.feedback = {type: 'warning', message: 'Error saving'};
      }
    );
  }

  cancel() {
    this.router.navigate(['/processes']);
  }
}
