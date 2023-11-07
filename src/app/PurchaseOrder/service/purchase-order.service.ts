import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { addPurchaseOrder } from '../Model/addPurchaseorder.model';
import { purchaseOrder } from '../Model/purchaseOrder.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {

  constructor(private http: HttpClient) { }

  createPurchaseOrder(data: addPurchaseOrder): Observable<purchaseOrder> {
    return this.http.post<purchaseOrder>(`${environment.appUrl}/PurchaseOrder`, data);
  }

  getAllPurchaseOrder(): Observable<purchaseOrder[]> {
    return this.http.get<purchaseOrder[]>(`${environment.appUrl}/PurchaseOrder/GetAll`);
  }

  getPurchaseOrderById(id: number): Observable<purchaseOrder> {
    return this.http.get<purchaseOrder>(`${environment.appUrl}/PurchaseOrder/${id}`)
  }

  deletePurchaseOrder(id: number): Observable<purchaseOrder> {
    return this.http.delete<purchaseOrder>(`${environment.appUrl}/PurchaseOrder/${id}`);
  }
}
