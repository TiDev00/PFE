import { Component, OnInit } from '@angular/core';
import { LogFilter } from '../log-filter';
import { LogService } from '../log.service';
import { Log } from '../log';

@Component({
  selector: 'app-log',
  templateUrl: 'log-list.component.html'
})
export class LogListComponent implements OnInit {

  filter = new LogFilter();
  selectedLog: Log;
  feedback: any = {};

  get logList(): Log[] {
    return this.logService.logList;
  }

  constructor(private logService: LogService) {
  }

  ngOnInit() {
    this.search();
  }

  search(): void {
    this.logService.load(this.filter);
  }

  select(selected: Log): void {
    this.selectedLog = selected;
  }

  delete(log: Log): void {
    if (confirm('Are you sure?')) {
      this.logService.delete(log).subscribe(() => {
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
