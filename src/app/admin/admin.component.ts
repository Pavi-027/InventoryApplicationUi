import { Component, OnInit, TemplateRef } from '@angular/core';
import { AdminService } from './admin.service';
import { SharedService } from '../shared/shared.service';
import { memberView } from './model/memberView.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  members: memberView[] = [];
  memberToDelete: memberView | undefined;
  modalRef?: BsModalRef;

  constructor(private adminservice: AdminService,
    private sharedService: SharedService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.adminservice.getMembers()
      .subscribe({
        next: members => this.members = members
      });
    console.log(this.members);
  }

  lockMember(id: string) {
    this.adminservice.lockMember(id)
      .subscribe({
        next: _ => {
          this.handleLockUnlockFilterAndMessages(id, true);

        }
      })
  }

  unlockMember(id: string) {
    this.adminservice.unlockMember(id)
      .subscribe({
        next: _ => {
          this.handleLockUnlockFilterAndMessages(id, false);

        }
      })
  }

  deleteMember(id: string, template: TemplateRef<any>) {
    let member = this.findMember(id);
    if (member) {
      this.memberToDelete = member;
      this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    }
  }

  confirm() {
    if (this.memberToDelete) {
      this.adminservice.deleteMember(this.memberToDelete.id)
        .subscribe({
          next: _ => {
            this.sharedService.showNotification(true, 'Deleted', `Member of ${this.memberToDelete?.userName} has been deleted`);
            this.members = this.members.filter(x => x.id !== this.memberToDelete?.id);
            this.memberToDelete = undefined;
            this.modalRef?.hide();
          }
        })
    }

  }

  decline() {
    this.memberToDelete = undefined;
    this.modalRef?.hide();
  }



  private handleLockUnlockFilterAndMessages(id: string, locking: boolean) {
    let member = this.findMember(id);

    if (member) {
      member.isLocked = !member.isLocked;

      if (locking) {
        this.sharedService.showNotification(true, 'Locked', `${member.userName} member has been locked`);
      } else {
        this.sharedService.showNotification(true, 'UnLocked', `${member.userName} member has been unlocked`);
      }
    }

  }

  private findMember(id: string): memberView | undefined {
    let member = this.members.find(x => x.id === id);
    if (member) {
      return member;
    }

    return undefined;
  }

}
