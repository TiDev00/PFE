import { Routes } from '@angular/router';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupEditComponent } from './group-edit/group-edit.component';
import { LoginGuard } from '../login/login.guard';

export const GROUP_ROUTES: Routes = [
  {
    path: 'groups',
    component: GroupListComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'groups/:id',
    component: GroupEditComponent
  }
];
