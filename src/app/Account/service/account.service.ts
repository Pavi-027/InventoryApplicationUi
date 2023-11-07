import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../model/register.model';
import { Login } from '../model/login.model';
import { User } from '../model/User.model';
import { environment } from 'src/environments/environment.development';
import { ReplaySubject, map, of } from 'rxjs';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ConfirmEmail } from '../model/confirm-email.model';
import { ResetPassword } from '../model/resetPassword.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userSource = new ReplaySubject<User | null>(1);
  user$ = this.userSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  register(model: Register) {
    return this.http.post(`${environment.appUrl}/Account/Register`, model);
  }

  confirmEmail(model: ConfirmEmail) {
    return this.http.put(`${environment.appUrl}/Account/confirm-email`, model);
  }

  resendEmailConfirmationLink(email: string) {
    return this.http.post(`${environment.appUrl}/Account/resend-email-confirmation-link/${email}`, {});
  }

  forgotUsernameOrPassword(email: string) {
    return this.http.post(`${environment.appUrl}/Account/forgot-username-or-password/${email}`, {});
  }

  resetPassword(model: ResetPassword) {
    return this.http.put(`${environment.appUrl}/Account/reset-password`, model);

  }

  refreshUser(jwtToken: string | null) {
    if (jwtToken === null) {
      this.userSource.next(null);
      return of(undefined);
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + jwtToken);

    return this.http.get<User>(`${environment.appUrl}/Account/RefreshUserToken`, { headers })
      .pipe(
        map((user: User) => {
          if (user) {
            this.setUser(user);
          }
        })
      )
  }

  login(model: Login) {
    return this.http.post<User>(`${environment.appUrl}/Account/Login`, model)
      .pipe(
        map((user: User) => {
          if (user) {
            this.setUser(user);
            //return user;
          }
          //return null;
        })
      );
  }

  logout() {
    localStorage.removeItem(environment.userKey);
    this.userSource.next(null);
    this.router.navigateByUrl('Account/login');
  }

  getJWT() {
    const key = localStorage.getItem(environment.userKey);
    if (key) {
      const user: User = JSON.parse(key);
      return user.jwtToken;
    }
    else {
      return null;
    }
  }

  private setUser(user: User) {
    localStorage.setItem(environment.userKey, JSON.stringify(user));
    this.userSource.next(user);

    // this.user$.subscribe({
    //   next: response => console.log(response)
    // })
  }
}
