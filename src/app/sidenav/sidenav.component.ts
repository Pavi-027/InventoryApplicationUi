import { Component, ElementRef, OnInit } from '@angular/core';
import { AccountService } from '../Account/service/account.service';
import { User } from '../Account/model/User.model';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  isDarkTheme: boolean = false;

  constructor(public accountService: AccountService,
    private themeService: ThemeService,
    private el: ElementRef) { }

  ngOnInit() {
    this.themeService.addThemedElement(this.el.nativeElement);
  }

  logout() {
    this.accountService.logout();
  }
}
