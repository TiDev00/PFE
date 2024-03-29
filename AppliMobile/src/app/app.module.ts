import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage'
import { AuthenticationService } from './services/authentication.service';
import { UtilsService } from './services/utils.service';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { Requete } from './models/requete';
import { AppFilterPipe } from './pipes/app-filter.pipe';

@NgModule({
  declarations: [AppComponent, AppFilterPipe],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthenticationService,
    Requete,
    UtilsService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
