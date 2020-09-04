import { Routes } from '@angular/router';
import { ApplicationListComponent } from './application-list/application-list.component';
import { ApplicationEditComponent } from './application-edit/application-edit.component';
import { GroupsResolverService } from '../resolvers/groups-resolver.service';
import { LoginGuard } from '../login/login.guard';

export const APPLICATION_ROUTES: Routes = [
  {
    path: 'applications',
    component: ApplicationListComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'applications/:id',
    resolve: {
      services: GroupsResolverService
    },
    component: ApplicationEditComponent
  }
];
