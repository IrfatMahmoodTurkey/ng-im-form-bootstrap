import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError, timeout } from 'rxjs';

@Injectable({ providedIn: 'any' })
export class TimeoutInterceptor implements HttpInterceptor {
  private TIMEOUT_IN_MILISECONDS: number = 60000;

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      timeout(this.TIMEOUT_IN_MILISECONDS),
      catchError((error) => {
        if (error.name === 'TimeoutError') {
          console.error('Request Timeout!');
        }

        return throwError(() => error);
      })
    );
  }
}
