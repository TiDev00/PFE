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
              public loadingController: LoadingController) { }

  intercept(request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>{
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
    };
    
    request = request.clone({
      headers: request.headers.set('Accept', 'application/json')
    });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
        }
        return event;
      }),
      
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        this.authenticationService.logout();
        return throwError(error);
        }
      )
    )
  }

  showLoader() {
    this.loaderToShow = this.loadingController.create({
      message: 'Processing Server Request'
    }).then((res) => {
      res.present();

      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed!');
      });
    });
    this.hideLoader();
  }

  hideLoader() {
      this.loadingController.dismiss();
  }

}
