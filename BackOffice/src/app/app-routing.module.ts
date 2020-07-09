import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PageNoteFoundComponent } from './page-note-found/page-note-found.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { CreateUserComponent } from './user/create-user/create-user.component';



const routes: Routes = [
  { path:'',
    redirectTo:'/login',
    pathMatch:'full'
  },

  {
    path:'login', 
    component:LoginComponent,
  },

  {
    path:'home', 
    component:HomeComponent,
    canActivate:[AuthenticationGuard]
  },

  {
    path:'user-list', 
    component:UserListComponent,
    canActivate:[AuthenticationGuard]
  },

  {
    path:'user-details', 
    component:UserDetailsComponent,
    canActivate:[AuthenticationGuard]
  },

  {
    path:'update-user', 
    component:UserDetailsComponent,
    canActivate:[AuthenticationGuard]
  },

  {
    path:'create-user', 
    component:CreateUserComponent,
    canActivate:[AuthenticationGuard]
  },

  {
    path:'**', 
    component:PageNoteFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
