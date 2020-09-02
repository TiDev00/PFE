import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ActionService } from '../action.service';
import { Action } from '../action';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Process } from 'src/app/process/process';


@Component({
  selector: 'app-action-edit',
  templateUrl: './action-edit.component.html'
})
export class ActionEditComponent implements OnInit {

  id: string;
  action: Action;
  feedback: any = {};
  loadedProcesses: Process[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private actionService: ActionService) {
  }

  ngOnInit() {
    this
      .route
      .params
      .pipe(
        map(p => p.id),
        switchMap(id => {
          if (id === 'new') { return of(new Action()); }
          return this.actionService.findById(id);
        })
      )
      .subscribe(action => {
          this.action = action;
          this.feedback = {};
        },
        err => {
          this.feedback = {type: 'warning', message: 'Error loading'};
        }
      );

      this.loadedProcesses = this.route.snapshot.data['processes'];
  }

  save() {
    const object = {
      id: this.action.id,
      actionName: this.action.actionName,
      descAction: this.action.descAction,
      processes: {id: this.action.processes}
    }
    const strObject = JSON.stringify(object);
    this.actionService.save(JSON.parse(strObject)).subscribe(
      action => {
        this.action = action;
        this.feedback = {type: 'success', message: 'Save was successful!'};
        setTimeout(() => {
          this.router.navigate(['/actions']);
        }, 1000);
      },
      err => {
        this.feedback = {type: 'warning', message: 'Error saving'};
      }
    );
  }

  cancel() {
    this.router.navigate(['/actions']);
  }


}
