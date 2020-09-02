import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { APP_EXTRA_OPTIONS, APP_ROUTES } from './app.routes';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserModule } from './user/User.module';
import { ServerModule } from './server/Server.module';
import { ProcessModule } from './process/Process.module';
import { GroupModule } from './group/Group.module';
import { CommandModule } from './command/Command.module';
import { ApplicationModule } from './application/Application.module';
import { ActionModule } from './action/Action.module';
import { LogModule } from './log/Log.module';
import { HttpInterceptorService } from './http-interceptor.service';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { LoginService } from './login/login.service';





@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([...APP_ROUTES], {...APP_EXTRA_OPTIONS}),
    UserModule,
    ServerModule,
    ProcessModule,
    GroupModule,
    CommandModule,
    ApplicationModule,
    ActionModule,
    LogModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent
  ],
  providers: [
    LoginService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
