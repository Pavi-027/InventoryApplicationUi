import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AddCategory } from 'src/app/category/Model/addCategory.model';
import { CategoyService } from '../service/categoy.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit, OnDestroy {

  addCategoryModel: AddCategory;
  private addCategorySubscription?: Subscription;

  constructor(private categoeryService: CategoyService, private router: Router) {

    this.addCategoryModel = {
      categoryName: ""
    }
  }

  ngOnInit(): void {

  }

  onFormSubmit() {
    this.addCategorySubscription = this.categoeryService.addCategory(this.addCategoryModel)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('category/list');
        }
      });
  }

  backToList(): void {
    this.categoeryService.getCategory()
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('category/list');
        }
      });
  }

  ngOnDestroy(): void {
    this.addCategorySubscription?.unsubscribe();
  }

}
