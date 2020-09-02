import { Component, OnInit } from '@angular/core';
import { ProcessFilter } from '../process-filter';
import { ProcessService } from '../process.service';
import { Process } from '../process';

@Component({
  selector: 'app-process',
  templateUrl: 'process-list.component.html'
})
export class ProcessListComponent implements OnInit {

  filter = new ProcessFilter();
  selectedProcess: Process;
  feedback: any = {};

  get processList(): Process[] {
    return this.processService.processList;
  }

  constructor(private processService: ProcessService) {
  }

  ngOnInit() {
    this.search();
  }

  search(): void {
    this.processService.load(this.filter);
  }

  select(selected: Process): void {
    this.selectedProcess = selected;
  }

  delete(process: Process): void {
    if (confirm('Are you sure?')) {
      this.processService.delete(process).subscribe(() => {
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
