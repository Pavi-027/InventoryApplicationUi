import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map } from "rxjs";
import { AccountService } from "src/app/Account/service/account.service";
import { SharedService } from "../shared.service";
import { User } from "src/app/Account/model/User.model";

@Injectable({
  providedIn: 'root'
})
export class authorizationGuards {
  constructor(private accountService: AccountService,
    private sharedService: SharedService,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.accountService.user$.pipe(
      map((user: User | null) => {
        if (user) {
          return true;
        }
        else {
          this.router.navigate(['Account/login'], { queryParams: { returnUrl: state.url } });
          this.sharedService.showNotification(false, 'Restricted Area', 'You have to login to access this application or Leave immediately!');
          return false;
        }
      })
    );
  }
}