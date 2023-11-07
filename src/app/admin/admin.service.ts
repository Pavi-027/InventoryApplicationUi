import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { memberView } from './model/memberView.model';
import { environment } from 'src/environments/environment.development';
import { memberAddEdit } from './model/memberAddEdit.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getMembers() {
    return this.http.get<memberView[]>(`${environment.appUrl}/admin/get-members`);
  }

  getMember(id: string) {
    return this.http.get<memberAddEdit>(`${environment.appUrl}/admin/get-member/${id}`);
  }

  getApplicationroles() {
    return this.http.get<string[]>(`${environment.appUrl}/admin/get-application-roles`);
  }

  addEditMember(model: memberAddEdit) {
    return this.http.post(`${environment.appUrl}/admin/add-edit-member`, model);
  }

  lockMember(id: string) {
    return this.http.put(`${environment.appUrl}/admin/lock-member/${id}`, {});
  }

  unlockMember(id: string) {
    return this.http.put(`${environment.appUrl}/admin/unlock-member/${id}`, {});
  }

  deleteMember(id: string) {
    return this.http.delete(`${environment.appUrl}/admin/delete-member/${id}`, {});
  }
}
