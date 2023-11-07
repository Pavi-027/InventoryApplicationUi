import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoyService } from '../service/categoy.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { category } from 'src/app/category/Model/category.model';
import { UpdateCategory } from 'src/app/category/Model/updateCategory.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit, OnDestroy{
 
  categoryId: string | null = null;
  paramsSubscription?: Subscription;
  updateCategorysubscription?: Subscription;
  category?: category;

  constructor(private route: ActivatedRoute, private categoryService: CategoyService, private router: Router){

  }

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next:(params) =>{
        this.categoryId = params.get('id');

        if(this.categoryId){
          this.categoryService.getCategoryByid(this.categoryId)
          .subscribe({
            next: (response) => {
              this.category = response;
            }
          });
        }
      }
    });
  }

  OnFormSubmit(): void{
   const updateCategory:UpdateCategory = {
    categoryName: this.category?.categoryName ?? ''
   };

   if(this.categoryId){
      this.categoryService.updateCategory(this.categoryId, updateCategory)
      .subscribe({
        next:(response) => {
          this.router.navigateByUrl('category/list');
        }
      });
   }
  }

  onDelete(): void{
    if(this.categoryId){
      this.categoryService.deleteCategory(this.categoryId)
      .subscribe({
        next:(response) => {
          this.router.navigateByUrl('category/list');
        }
      });
    }    
  }

  backToList():void{
    if(this.categoryId){
      this.categoryService.getCategory()
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('category/list');
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.updateCategorysubscription?.unsubscribe();
  }
}
