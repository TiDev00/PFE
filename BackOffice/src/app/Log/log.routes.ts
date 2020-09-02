import { Routes } from '@angular/router';
import { LogListComponent } from './log-list/log-list.component';
import { LogEditComponent } from './log-edit/log-edit.component';
import { LoginGuard } from '../login/login.guard';

export const LOG_ROUTES: Routes = [
  {
    path: 'logs',
    component: LogListComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'logs/:id',
    component: LogEditComponent
  }
];
