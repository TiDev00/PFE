import {ExtraOptions, Routes, PreloadAllModules} from '@angular/router';
import {HomeComponent} from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './login/login.guard';


export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
]

export const APP_EXTRA_OPTIONS: ExtraOptions = {
  preloadingStrategy: PreloadAllModules
}
