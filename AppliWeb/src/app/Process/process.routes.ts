import { Routes } from '@angular/router';
import { ProcessListComponent } from './process-list/process-list.component';
import { ProcessEditComponent } from './process-edit/process-edit.component';
import { ApplicationsResolverService } from '../resolvers/applications-resolver.service';
import { ServersResolverService } from '../resolvers/servers-resolver.service';
import { LoginGuard } from '../login/login.guard';

export const PROCESS_ROUTES: Routes = [
  {
    path: 'processes',
    component: ProcessListComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'processes/:id',
    resolve:{
      applications: ApplicationsResolverService,
      servers: ServersResolverService
    },
    component: ProcessEditComponent
  }
];
