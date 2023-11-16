import { Component, OnInit } from '@angular/core';
import { AccountService } from './Account/service/account.service';
import { SharedService } from './shared/shared.service';
import { ThemeService } from './theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private themeSubscription: Subscription | undefined;

  constructor(public accountService: AccountService,
    private sharedService: SharedService,
    public themeService: ThemeService) {
    // this.themeSubscription = this.themeService.activeTheme$.subscribe(theme => {
    //   this.themeService.setTheme(theme);
    // });
  }

  switchTheme(theme: string) {
    this.themeService.setTheme(theme);
  }

  ngOnInit(): void {
    this.refreshUser();

    // this.themeService.themeChanged.subscribe((isDarkTheme: boolean) => {
    //   // Handle theme change here
    //   // For example, update styles or apply CSS classes
    //   document.body.classList.toggle('dark-theme', isDarkTheme);
    // });
  }

  // toggleTheme() {
  //   this.themeService.toggleTheme();
  // }

  private refreshUser() {
    const jwt = this.accountService.getJWT();
    if (jwt) {
      this.accountService.refreshUser(jwt)
        .subscribe({
          next: _ => { },
          error: error => {
            this.accountService.logout();

            if (error.status === 401) {
              this.sharedService.showNotification(false, 'Account blocked', error.error);
            }
          }
        })
    }
    else {
      this.accountService.refreshUser(null).subscribe();
    }
  }

  ngOnDestroy() {
    this.themeSubscription?.unsubscribe();
  }


}
