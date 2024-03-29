import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ProcessResolveService } from './resolvers/process-resolve.service';
import { UserResolveService } from './resolvers/user-resolve.service';
import { ApplicationResolveService } from './resolvers/application-resolve.service';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },

  {
    path: 'applications',
    resolve: {
      user: UserResolveService,
      applications: ApplicationResolveService
    },
    loadChildren: () => import('./applications/applications.module').then( m => m.ApplicationsPageModule)
  },

  {
    path: 'application/:id',
    resolve: {
      application: ProcessResolveService
    },
    loadChildren: () => import('./process/process.module').then( m => m.ProcessPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
