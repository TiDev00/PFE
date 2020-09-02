import { Routes } from '@angular/router';
import { ActionListComponent } from './action-list/action-list.component';
import { ActionEditComponent } from './action-edit/action-edit.component';
import { ProcessesResolverService } from '../resolvers/processes-resolver.service';
import { LoginGuard } from '../login/login.guard';

export const ACTION_ROUTES: Routes = [
  {
    path: 'actions',
    component: ActionListComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'actions/:id',
    resolve:{
      processes: ProcessesResolverService
    },
    component: ActionEditComponent
  }
];
