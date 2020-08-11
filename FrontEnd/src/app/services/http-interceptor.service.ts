import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor{

  loaderToShow: any;

  constructor(private authenticationService: AuthenticationService,
              public loadingCtrl: LoadingController) { }

  intercept(request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>{
    
    this.loadingCtrl.getTop().then(hasloading => {
      if(!hasloading){
        this.loadingCtrl.create({
          spinner: 'circular',
          translucent: true
        }).then(loading => loading.present())
      }
    });

    let token = localStorage.getItem('token')

    if (token) {
      request = request.clone({
        setHeaders: {
          'Authorization': token
        }
      })
    };

    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        setHeaders: {
          'content-type': 'application/json'
        }
      })
    }
    
    request = request.clone({
      headers: request.headers.set('Accept', 'application/json')
    });



    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
        }
        this.loadingCtrl.getTop().then(hasloading => {
          if(hasloading){
            this.loadingCtrl.dismiss();
          }
        });
        return event;
      }),
      
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.loadingCtrl.getTop().then(hasloading => {
            if(hasloading){
              this.loadingCtrl.dismiss();
            }
          });
          return this.handle403Error(error);
        } 
        
        this.loadingCtrl.getTop().then(hasloading => {
          if(hasloading){
            this.loadingCtrl.dismiss();
          }
        });
        return throwError(error)
      })
    )
  }

  handle403Error(error){
    this.authenticationService.logout();
    return throwError(error)
  }


}
