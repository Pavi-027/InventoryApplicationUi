import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { addCustomer } from '../Model/addCustomer.model';
import { Customer } from '../Model/customer.model';
import { Observable } from 'rxjs';
import { editCustomer } from '../Model/editCustomer.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  createCustomer(data: addCustomer): Observable<Customer> {
    return this.http.post<Customer>(`${environment.appUrl}/Customer`, data);
  }
  getAllCustomer(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${environment.appUrl}/Customer/GetAll`);
  }
  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${environment.appUrl}/Customer/${id}`)
  }
  updateCustomer(id: number, editedCustomer: editCustomer): Observable<Customer> {
    return this.http.put<Customer>(`${environment.appUrl}/Customer/${id}`, editedCustomer);
  }
  deleteCustomer(id: number): Observable<Customer> {
    return this.http.delete<Customer>(`${environment.appUrl}/Customer/${id}`);
  }
}
