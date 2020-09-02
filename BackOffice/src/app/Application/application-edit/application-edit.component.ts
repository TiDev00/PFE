import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ApplicationService } from '../application.service';
import { Application } from '../application';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Group } from 'src/app/group/group';

@Component({
  selector: 'app-application-edit',
  templateUrl: './application-edit.component.html'
})
export class ApplicationEditComponent implements OnInit {

  id: string;
  application: Application;
  feedback: any = {};
  loadedServices: Group[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private applicationService: ApplicationService) {
  }

  ngOnInit() {
    this
      .route
      .params
      .pipe(
        map(p => p.id),
        switchMap(id => {
          if (id === 'new') { return of(new Application()); }
          return this.applicationService.findById(id);
        })
      )
      .subscribe(application => {
          this.application = application;
          this.feedback = {};
        },
        err => {
          this.feedback = {type: 'warning', message: 'Error loading'};
        }
      );

      this.loadedServices = this.route.snapshot.data['services']
  }

  save() {
    const object = {
      id: this.application.id,
      appName: this.application.appName,
      descApp: this.application.descApp,
      service: {id: this.application.service}
    }
    const strObject = JSON.stringify(object);
    this.applicationService.save(JSON.parse(strObject)).subscribe(
      application => {
        this.application = application;
        this.feedback = {type: 'success', message: 'Save was successful!'};
        setTimeout(() => {
          this.router.navigate(['/applications']);
        }, 1000);
      },
      err => {
        this.feedback = {type: 'warning', message: 'Error saving'};
      }
    );
  }

  cancel() {
    this.router.navigate(['/applications']);
  }
}
