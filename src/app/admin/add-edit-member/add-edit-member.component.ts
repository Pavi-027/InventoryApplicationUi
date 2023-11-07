import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';
import { SharedService } from 'src/app/shared/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { memberAddEdit } from '../model/memberAddEdit.model';

@Component({
  selector: 'app-add-edit-member',
  templateUrl: './add-edit-member.component.html',
  styleUrls: ['./add-edit-member.component.css']
})
export class AddEditMemberComponent implements OnInit {
  memberForm: FormGroup = new FormGroup({});
  formInitialized = false;
  addNew = true;
  submitted = false;
  errorMessages: string[] = [];
  applicationRoles: string[] = [];
  existingMemberRoles: string[] = [];

  constructor(private adminService: AdminService,
    private sharedService: SharedService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activateroute: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.activateroute.snapshot.paramMap.get('id');
    if (id) {
      this.addNew = false;
      this.getMember(id);
    } else {
      this.initializeForm(undefined);
    }

    this.getRoles();
  }

  getMember(id: string) {
    if (id) {
      this.adminService.getMember(id)
        .subscribe({
          next: member => {
            this.initializeForm(member);
            console.log(member);
          }
        })
    }
  }

  getRoles() {
    this.adminService.getApplicationroles()
      .subscribe({
        next: roles => this.applicationRoles = roles
      });
  }

  initializeForm(member: memberAddEdit | undefined) {
    if (member) {
      this.memberForm = this.formBuilder.group({
        id: [member.id],
        fullName: [member.fullName, [Validators.required]],
        userName: [member.userName, [Validators.required]],
        password: [''],
        roles: [member.roles, [Validators.required]]
      });

      this.existingMemberRoles = member.roles.split(',');
    }
    else {
      this.memberForm = this.formBuilder.group({
        id: [''],
        fullName: ['', [Validators.required]],
        userName: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
        roles: ['', [Validators.required]]
      });
    }

    this.formInitialized = true;
  }

  passwordOnChange() {
    if (this.addNew == false) {
      if (this.memberForm.get('password')?.value) {
        this.memberForm.controls['password'].setValidators([Validators.required, Validators.minLength(6), Validators.maxLength(50)]);
      }
      else {
        this.memberForm.get('password')?.clearValidators();
      }

      this.memberForm.controls['password'].updateValueAndValidity();
    }
  }

  roleOnChange(selectedRole: string) {
    let roles = this.memberForm.get('roles')?.value.split(',');
    console.log(roles);

    //const index = roles.indexOf(selectedRole);
    const index = roles.indexOf(selectedRole);
    console.log(index);

    index !== -1 ? roles.splice(index, 1) : roles.push(selectedRole);

    if (roles[0] === "") {
      roles.splice(0, 1);
    }

    this.memberForm.controls['roles'].setValue(roles.join(','));
    console.log(this.memberForm.get('roles')?.value);
  }

  submit() {
    this.submitted = true;
    this.errorMessages = [];

    if (this.memberForm.valid) {
      this.adminService.addEditMember(this.memberForm.value)
        .subscribe({
          next: (response: any) => {
            this.sharedService.showNotification(true, response.value.title, response.value.message);
            this.router.navigateByUrl('/admin');
          },
          error: error => {
            if (error.error.errors) {
              this.errorMessages = error.error.errors;
            } else {
              this.errorMessages.push(error.error);
            }
          }
        })
    }
  }
}
