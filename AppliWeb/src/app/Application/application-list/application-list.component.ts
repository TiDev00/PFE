import { Component, OnInit } from '@angular/core';
import { ApplicationFilter } from '../application-filter';
import { ApplicationService } from '../application.service';
import { Application } from '../application';

@Component({
  selector: 'app-application',
  templateUrl: 'application-list.component.html'
})
export class ApplicationListComponent implements OnInit {

  filter = new ApplicationFilter();
  selectedApplication: Application;
  feedback: any = {};

  get applicationList(): Application[] {
    return this.applicationService.applicationList;
  }

  constructor(private applicationService: ApplicationService) {
  }

  ngOnInit() {
    this.search();
  }

  search(): void {
    this.applicationService.load(this.filter);
  }

  select(selected: Application): void {
    this.selectedApplication = selected;
  }

  delete(application: Application): void {
    if (confirm('Are you sure?')) {
      this.applicationService.delete(application).subscribe(() => {
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
