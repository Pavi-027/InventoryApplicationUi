import { Component, OnInit } from '@angular/core';
import { AccountService } from '../Account/service/account.service';
import { User } from '../Account/model/User.model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {

  constructor(public accountService: AccountService) { }

  logout() {
    this.accountService.logout();
  }
}
