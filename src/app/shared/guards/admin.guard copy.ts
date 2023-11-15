import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map } from "rxjs";
import { AccountService } from "src/app/Account/service/account.service";
import { SharedService } from "../shared.service";
import { jwtDecode } from 'jwt-decode';
import { User } from "src/app/Account/model/User.model";

@Injectable({
  providedIn: 'root'
})
export class adminGuard {
  constructor(private accountService: AccountService,
    private sharedService: SharedService,
    private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.accountService.user$.pipe(
      map((user: User | null) => {
        if (user) {
          const decodedToken: any = jwtDecode(user.jwtToken);
          if (decodedToken.role.includes('Admin')) {
            return true;
          }
        }

        this.sharedService.showNotification(false, 'Admin Area', 'Access allowed only for Admin');
        this.router.navigateByUrl('Account/login');

        return false;
      })
    );
  }
}