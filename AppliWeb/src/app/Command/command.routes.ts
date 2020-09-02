import { Routes } from '@angular/router';
import { CommandListComponent } from './command-list/command-list.component';
import { CommandEditComponent } from './command-edit/command-edit.component';
import { ActionsResolverService } from '../resolvers/actions-resolver.service';
import { LoginGuard } from '../login/login.guard';

export const COMMAND_ROUTES: Routes = [
  {
    path: 'commands',
    component: CommandListComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'commands/:id',
    resolve: {
      actions: ActionsResolverService
    },
    component: CommandEditComponent
  }
];
