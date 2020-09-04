import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { GroupsResolverService } from '../resolvers/groups-resolver.service';
import { LoginGuard } from '../login/login.guard';

export const USER_ROUTES: Routes = [
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'users/:id',
    resolve: {
      services: GroupsResolverService
    },
    component: UserEditComponent
  }
];
