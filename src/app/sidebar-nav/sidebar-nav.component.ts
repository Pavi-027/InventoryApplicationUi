import { Component } from '@angular/core';
import { AccountService } from '../Account/service/account.service';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.css']
})
export class SidebarNavComponent {
  status: boolean = true;

  constructor(public accountService: AccountService,
    private themeService: ThemeService) { }

  clickEvent() {
    this.status = !this.status;
  }

  switchTheme(theme: string) {
    if (theme) {
      this.themeService.setTheme(theme);
    }
  }

  logout() {
    this.accountService.logout();
  }

}
