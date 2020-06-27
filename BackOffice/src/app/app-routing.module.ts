import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PageNoteFoundComponent } from './page-note-found/page-note-found.component';



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
    component:HomeComponent
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
