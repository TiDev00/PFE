import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { LogService } from '../log.service';
import { Log } from '../log';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-log-edit',
  templateUrl: './log-edit.component.html'
})
export class LogEditComponent implements OnInit {

  id: string;
  log: Log;
  feedback: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private logService: LogService) {
  }

  ngOnInit() {
    this
      .route
      .params
      .pipe(
        map(p => p.id),
        switchMap(id => {
          if (id === 'new') { return of(new Log()); }
          return this.logService.findById(id);
        })
      )
      .subscribe(log => {
          this.log = log;
          this.feedback = {};
        },
        err => {
          this.feedback = {type: 'warning', message: 'Error loading'};
        }
      );
  }

  save() {
    this.logService.save(this.log).subscribe(
      log => {
        this.log = log;
        this.feedback = {type: 'success', message: 'Save was successful!'};
        setTimeout(() => {
          this.router.navigate(['/logs']);
        }, 1000);
      },
      err => {
        this.feedback = {type: 'warning', message: 'Error saving'};
      }
    );
  }

  cancel() {
    this.router.navigate(['/logs']);
  }
}
