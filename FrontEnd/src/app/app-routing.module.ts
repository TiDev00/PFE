import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ServersResolveService } from './resolvers/servers-resolve.service';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'applications',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },

  {
    path: 'applications',
    loadChildren: () => import('./applications/applications.module').then( m => m.ApplicationsPageModule)
  },

  {
    path: 'application/:id',
    resolve: {
      application: ServersResolveService
    },
    loadChildren: () => import('./servers/servers.module').then( m => m.ServersPageModule), 
  },
  
  {
    path: 'commands',
    loadChildren: () => import('./commands/commands.module').then( m => m.CommandsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
