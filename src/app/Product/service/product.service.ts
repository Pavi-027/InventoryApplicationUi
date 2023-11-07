import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { product } from '../Model/product.model';
import { AddProduct } from '../Model/addProduct.model';
import { HttpClient } from '@angular/common/http';
import { editProduct } from '../Model/editProduct.model';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {

  }
  createProduct(data: AddProduct): Observable<product> {
    return this.http.post<product>(`${environment.appUrl}/Product`, data);
  }
  getAllProducts(): Observable<product[]> {
    return this.http.get<product[]>(`${environment.appUrl}/Product/GetAll`);
  }
  getProductById(id: string): Observable<product> {
    return this.http.get<product>(`${environment.appUrl}/Product/${id}`)
  }
  updateProduct(id: string, editedProduct: editProduct): Observable<product> {
    return this.http.put<product>(`${environment.appUrl}/Product/${id}`, editedProduct);
  }
  deleteProduct(id: string): Observable<product> {
    return this.http.delete<product>(`${environment.appUrl}/Product/${id}`);
  }
}
