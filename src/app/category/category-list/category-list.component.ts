import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { category } from 'src/app/category/Model/category.model';
import { CategoyService } from '../service/categoy.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent {
  categoryModel?:Observable<category[]>;
  
  constructor(private categoryService:CategoyService){
    this.getCategory();
  }
  getCategory():void{
    this.categoryModel = this.categoryService.getCategory();
    console.log(this.categoryModel);
  }

}
