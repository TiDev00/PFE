import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Group } from 'src/app/group/group';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html'
})
export class UserEditComponent implements OnInit {

  id: string;
  user: User;
  feedback: any = {};
  loadedServices: Group[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) {
  }

  ngOnInit() {
    this
      .route
      .params
      .pipe(
        map(p => p.id),
        switchMap(id => {
          if (id === 'new') { return of(new User()); }
          return this.userService.findByMatricule(id);
        })
      )
      .subscribe(user => {
          this.user = user;
          this.feedback = {};
        },
        err => {
          this.feedback = {type: 'warning', message: 'Error loading'};
        }
      );

      this.loadedServices = this.route.snapshot.data['services'];
  }

  save() {
    const object = {
      matricule: this.user.matricule,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      service: {id: this.user.service}
    }
    const strObject = JSON.stringify(object);
    this.userService.save(JSON.parse(strObject)).subscribe(
      user => {
        this.user = user;
        this.feedback = {type: 'success', message: 'Save was successful!'};
        setTimeout(() => {
          this.router.navigate(['/users']);
        }, 1000);
      },
      err => {
        this.feedback = {type: 'warning', message: 'User already exist'};
      }
    );
  }

  update() {
    const object = {
      matricule: this.user.matricule,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      service: {id: this.user.service}
    }
    const strObject = JSON.stringify(object);
    this.userService.update(JSON.parse(strObject)).subscribe(
      user => {
        this.user = user;
        this.feedback = {type: 'success', message: 'Save was successful!'};
        setTimeout(() => {
          this.router.navigate(['/users']);
        }, 1000);
      },
      err => {
        this.feedback = {type: 'warning', message: 'Error saving'};
      }
    );
  }

  cancel() {
    this.router.navigate(['/users']);
  }
}
