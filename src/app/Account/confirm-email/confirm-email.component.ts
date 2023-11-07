import { Component, OnInit } from '@angular/core';
import { AccountService } from '../service/account.service';
import { SharedService } from 'src/app/shared/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { User } from '../model/User.model';
import { ConfirmEmail } from '../model/confirm-email.model';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {
  success = true;

  constructor(private accountService: AccountService,
    private sharedService: SharedService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.accountService.user$.pipe(take(1))
      .subscribe({
        next: (user: User | null) => {
          if (user) {
            this.router.navigateByUrl('/');
          }
          else {
            this.activatedRoute.queryParamMap
              .subscribe({
                next: (params: any) => {
                  const ConfirmEmail: ConfirmEmail = {
                    token: params.get('token'),
                    email: params.get('email')
                  }
                  this.accountService.confirmEmail(ConfirmEmail)
                    .subscribe({
                      next: (response: any) => {
                        this.sharedService.showNotification(true, response.value.title, response.value.message);
                      },
                      error: error => {
                        this.success = false;
                        this.sharedService.showNotification(false, "Failed", error.error);
                      }
                    })
                }
              })
          }
        }
      })
  }

  resendEmailConfirmationLink() {
    this.router.navigateByUrl('Account/send-email/resend-email-confirmation-link');
  }

}
