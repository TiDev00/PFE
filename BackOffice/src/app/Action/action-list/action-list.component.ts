import { Component, OnInit } from '@angular/core';
import { ActionFilter } from '../action-filter';
import { ActionService } from '../action.service';
import { Action } from '../action';

@Component({
  selector: 'app-action',
  templateUrl: 'action-list.component.html'
})
export class ActionListComponent implements OnInit {

  filter = new ActionFilter();
  selectedAction: Action;
  feedback: any = {};

  get actionList(): Action[] {
    return this.actionService.actionList;
  }

  constructor(private actionService: ActionService) {
  }

  ngOnInit() {
    this.search();

  }

  search(): void {
    this.actionService.load(this.filter);
  }

  select(selected: Action): void {
    this.selectedAction = selected;
  }

  delete(action: Action): void {
    if (confirm('Are you sure?')) {
      this.actionService.delete(action).subscribe(() => {
          this.feedback = {type: 'success', message: 'Delete was successful!'};
          setTimeout(() => {
            this.search();
          }, 1000);
        },
        err => {
          this.feedback = {type: 'warning', message: 'Error deleting.'};
        }
      );
    }
  }
}
