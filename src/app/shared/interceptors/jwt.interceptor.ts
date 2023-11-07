import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { AccountService } from 'src/app/Account/service/account.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.accountService.user$.pipe(take(1))
      .subscribe({
        next: (user) => {
          if (user) {
            //clone from the comming request and add authorization header to that
            request = request.clone({
              setHeaders: {
                Authorization: `Bearer ${user.jwtToken}`
              }
            });
          }
        }
      })
    return next.handle(request);
  }
}
