import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { UtilsService } from './utils.service';


@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor{

  constructor(private authenticationService: AuthenticationService,
              private utils: UtilsService) { }
    

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
    }
    
    request = request.clone({
      headers: request.headers.set('Accept', 'application/json')
    });

    
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
        }
        return event
      }),
      
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          return this.handle403Error(error)
        }
        this.utils.presentToast('Unknown error', 'danger')
        return throwError(error)
      })
    )
  }

  handle403Error(error){
    this.utils.presentToast('Token has expired. Connect again','warning')
    this.authenticationService.logout()
    return throwError(error)
  }
}
