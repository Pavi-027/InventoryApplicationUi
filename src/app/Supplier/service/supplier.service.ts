import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { addSupplier } from '../Model/addSupplier.model';
import { supplier } from '../Model/supplier.model';
import { Observable } from 'rxjs';
import { editsupplier } from '../Model/editSupplier.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http: HttpClient) { }

  createSupplier(data: addSupplier): Observable<supplier> {
    return this.http.post<supplier>(`${environment.appUrl}/Supplier`, data);
  }
  getAllSupplier(): Observable<supplier[]> {
    return this.http.get<supplier[]>(`${environment.appUrl}/Supplier/GetAll`);
  }
  getSupplierById(id: number): Observable<supplier> {
    return this.http.get<supplier>(`${environment.appUrl}/Supplier/${id}`)
  }
  updateSupplier(id: number, editedSupplier: editsupplier): Observable<supplier> {
    return this.http.put<supplier>(`${environment.appUrl}/Supplier/${id}`, editedSupplier);
  }
  deleteSupplier(id: number): Observable<supplier> {
    return this.http.delete<supplier>(`${environment.appUrl}/Supplier/${id}`);
  }
}
