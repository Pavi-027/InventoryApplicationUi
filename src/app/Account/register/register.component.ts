import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../service/account.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import { take } from 'rxjs';
import { User } from '../model/User.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({});
  submitted = false;
  errorMessages: string[] = [];

  constructor(private accountService: AccountService,
    private formBuilder: FormBuilder,
    private router: Router,
    private sharedService: SharedService) {
    this.accountService.user$.pipe(take(1))
      .subscribe({
        next: (user: User | null) => {
          if (user) {
            this.router.navigateByUrl('/');
          }
        }
      })

  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.pattern(("^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$"))]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50), this.passwordMatchValidator.bind(this)]],
      streetAddress: [''],
      state: [''],
      city: [''],
      pincode: ['']
    })
  }

  //compare the confirm password with the password
  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = control.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;

  }

  register() {
    this.submitted = true;
    this.errorMessages = [];

    if (this.registerForm.valid) {
      this.accountService.register(this.registerForm.value)
        .subscribe({
          next: (response: any) => {
            this.sharedService.showNotification(true, response.value.title, response.value.message);
            this.router.navigateByUrl('Account/login');

            console.log(response);
          },
          error: error => {
            console.log(error);
            if (error.error.errors) {
              this.errorMessages = error.error.errors;
            }
            else {
              this.errorMessages.push(error.error);
            }
          }
        });
    }
  }
}
