import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { NotificationComponent } from './components/modals/notification/notification.component';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  bsmodalRes?: BsModalRef;

  constructor(private modalService: BsModalService) { }

  showNotification(isSuccess: boolean, title: string, message: string) {
    const initalstate: ModalOptions = {
      initialState: {
        isSuccess,
        title,
        message
      }
    };

    this.bsmodalRes = this.modalService.show(NotificationComponent, initalstate);
  }
}
