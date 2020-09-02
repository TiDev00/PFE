import { Routes } from '@angular/router';
import { ServerListComponent } from './server-list/server-list.component';
import { ServerEditComponent } from './server-edit/server-edit.component';
import { LoginGuard } from '../login/login.guard';

export const SERVER_ROUTES: Routes = [
  {
    path: 'servers',
    component: ServerListComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'servers/:id',
    component: ServerEditComponent
  }
];
