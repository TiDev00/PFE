import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CommandService } from '../command.service';
import { Command } from '../command';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Action } from 'src/app/action/action';


@Component({
  selector: 'app-command-edit',
  templateUrl: './command-edit.component.html',
})

export class CommandEditComponent implements OnInit {

  id: string;
  command: Command;
  feedback: any = {};
  loadedActions: Action[];

  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commandService: CommandService) {
  }

  ngOnInit() {
    this
      .route
      .params
      .pipe(
        map(p => p.id),
        switchMap(id => {
          if (id === 'new') { return of(new Command()); }
          return this.commandService.findById(id);
        })
      )
      .subscribe(command => {
          this.command = command;
          this.feedback = {};
        },
        err => {
          this.feedback = {type: 'warning', message: 'Error loading'};
        }
      );

      this.loadedActions = this.route.snapshot.data['actions']
  }

  save() {
    const object = {
      id: this.command.id,
      commandName: this.command.commandName,
      forStatus: this.command.forStatus,
      descCommand: this.command.descCommand,
      actions: {id: this.command.actions}
    }
    const strObject = JSON.stringify(object);
    this.commandService.save(JSON.parse(strObject)).subscribe(
      command => {
        this.command = command;
        this.feedback = {type: 'success', message: 'Save was successful!'};
        setTimeout(() => {
          this.router.navigate(['/commands']);
        }, 1000);
      },
      err => {
        this.feedback = {type: 'warning', message: 'Error saving'};
      }
    );
  }

  cancel() {
    this.router.navigate(['/commands']);
  }
}
