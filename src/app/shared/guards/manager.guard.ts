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
export class managerGuard {
  constructor(private accountService: AccountService,
    private sharedService: SharedService,
    private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.accountService.user$.pipe(
      map((user: User | null) => {
        if (user) {
          const decodedToken: any = jwtDecode(user.jwtToken);
          if (decodedToken.role.includes('Manager')) {
            return true;
          }
        }

        this.sharedService.showNotification(false, 'Manager Area', 'Access allowed only for Manager');
        this.router.navigateByUrl('Account/login');

        return false;
      })
    );
  }
}