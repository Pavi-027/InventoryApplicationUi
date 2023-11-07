import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { addSalesOrder } from '../Model/addSalesOrder.model';
import { salesOrder } from '../Model/salesOrder.model';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class SalesOrderService {

  constructor(private http: HttpClient) { }

  createSalesOrder(data: addSalesOrder): Observable<salesOrder> {
    return this.http.post<salesOrder>(`${environment.appUrl}/SalesOrder`, data);
  }

  getAllSalesOrder(): Observable<salesOrder[]> {
    return this.http.get<salesOrder[]>(`${environment.appUrl}/SalesOrder/GetAll`);
  }

  getSalesOrderById(id: number): Observable<salesOrder> {
    return this.http.get<salesOrder>(`${environment.appUrl}/SalesOrder/${id}`)
  }

  // updateSalesOrder(id: number, editedSalesOrder: editSalesOrder): Observable<salesOrder> {
  //   return this.http.put<salesOrder>(`${environments.getCustomerById}/${id}`, editedSalesOrder);
  // }

  deleteSalesOrder(id: number): Observable<salesOrder> {
    return this.http.delete<salesOrder>(`${environment.appUrl}/SalesOrder/${id}`);
  }
}
