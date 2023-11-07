import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddCategory } from 'src/app/category/Model/addCategory.model';
import { category } from 'src/app/category/Model/category.model';
import { UpdateCategory } from 'src/app/category/Model/updateCategory.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoyService {

  constructor(private http: HttpClient) { }

  getCategory(): Observable<category[]> {
    return this.http.get<category[]>(`${environment.appUrl}/Category/GetAll`);
  }
  addCategory(addCategoryModel: AddCategory): Observable<AddCategory> {
    return this.http.post<AddCategory>(`${environment.appUrl}/Category`, addCategoryModel);
  }
  getCategoryByid(id: string): Observable<category> {
    return this.http.get<category>(`${environment.appUrl}/Category/${id}`);
  }
  updateCategory(id: string, updateCategory: UpdateCategory): Observable<category> {
    return this.http.put<category>(`${environment.appUrl}/Category/${id}`, updateCategory);
  }
  deleteCategory(id: string): Observable<category> {
    return this.http.delete<category>(`${environment.appUrl}/Category/${id}`);
  }
}
