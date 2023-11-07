import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { take } from 'rxjs';
import { AccountService } from 'src/app/Account/service/account.service';
import { jwtDecode } from 'jwt-decode';

@Directive({
  selector: '[appUserHasRoleDirective]'
})
export class UserHasRoleDirectiveDirective implements OnInit {
  @Input() appUserHasRoleDirective: string[] = [];

  constructor(private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.user$.pipe((take(1)))
      .subscribe({
        next: user => {
          if (user) {
            const decodedtoken: any = jwtDecode(user.jwtToken);

            const roles = Array.isArray(decodedtoken.role) ? decodedtoken.role : [decodedtoken.role];

            if (roles.some((role: any) => this.appUserHasRoleDirective.includes(role.toLowerCase()))) {
              this.viewContainerRef.createEmbeddedView(this.templateRef);
            }
            else {
              this.viewContainerRef.clear();
            }
          }
          else {
            this.viewContainerRef.clear();
          }
        }
      })
  }
}


// CODE EXPLANATION
// This code defines an Angular directive called UserHasRoleDirectiveDirective, which is designed to conditionally show or hide elements in your Angular application's templates based on a user's roles decoded from a JWT token. Let's break down the code:

// 1) Import Statements: The code begins by importing various dependencies and libraries required for this directive to work. These include Angular core components, RxJS operators (take), the AccountService, and jwt-decode.

// 2) Directive Definition: The @Directive decorator is used to define this class as an Angular directive. It specifies the selector as [appUserHasRoleDirective]. This means you can use this directive in your HTML templates as an attribute on an element. 

// 3) Class Definition: The UserHasRoleDirectiveDirective class does not implement the OnInit interface, so there's no need for an ngOnInit method. However, the directive should still work as expected.

// 4) Input Property: The @Input() decorator is used to define an input property called appUserHasRoleDirective, which is an array of strings. This property is intended to specify the roles that should be able to see the element. For example, you can use this directive in your HTML like this: <div [appUserHasRoleDirective]="['admin']">...</div>. It means that the element will only be visible to users with the 'admin' role.

// 5) Constructor: The constructor takes three dependencies: viewContainerRef, templateRef, and accountService. These are required for dynamic view manipulation and user role checking.

// 6)ngOnInit Method: The ngOnInit method is incorrectly defined and is not required for this directive. The directive's functionality is based on the input property and the subscription to the user$ observable from the accountService.

// 7) Subscription to user$ Observable: 
//-> The directive subscribes to the user$ observable provided by the accountService using the pipe(take(1)) operator. This setup ensures that it only takes one user emission and then unsubscribes automatically.
//->  In the subscribe block, it checks if a user exists.
// * If a user exists, it attempts to decode the JWT token using jwtDecode. The decoded token is stored in the decodedtoken variable.
// * It then checks if any of the roles listed in decodedtoken.role are included in the appUserHasRoleDirective array, and it does so in a case-insensitive manner by converting both the role and the allowed roles to lowercase.
// * If there is a match, it creates an embedded view of the templateRef, which will render the element associated with this directive.
// * If there is no match, it clears the view, effectively hiding the element.
// * If no user is present, it also clears the view, hiding the element.

// This directive allows you to conditionally display or hide elements in your Angular application based on the user's roles decoded from a JWT token. If a user has at least one role that matches the specified roles in appUserHasRoleDirective, the element will be displayed; otherwise, it will be hidden.





