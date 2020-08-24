import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'action',
        loadChildren: () => import('./action/action.module').then(m => m.HotSupportAdminActionModule),
      },
      {
        path: 'application',
        loadChildren: () => import('./application/application.module').then(m => m.HotSupportAdminApplicationModule),
      },
      {
        path: 'command',
        loadChildren: () => import('./command/command.module').then(m => m.HotSupportAdminCommandModule),
      },
      {
        path: 'group',
        loadChildren: () => import('./group/group.module').then(m => m.HotSupportAdminGroupModule),
      },
      {
        path: 'process',
        loadChildren: () => import('./process/process.module').then(m => m.HotSupportAdminProcessModule),
      },
      {
        path: 'server',
        loadChildren: () => import('./server/server.module').then(m => m.HotSupportAdminServerModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class HotSupportAdminEntityModule {}
