import { Component, OnInit, numberAttribute } from '@angular/core';
import { AddProduct } from '../Model/addProduct.model';
import { category } from 'src/app/category/Model/category.model';
import { HttpClient } from '@angular/common/http';
import { CategoyService } from 'src/app/category/service/categoy.service';
import { Observable } from 'rxjs';
import { ProductService } from '../service/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  model: AddProduct;
  categories?: category[];
  selectedCategory?: number;

  constructor(private http: HttpClient,
    private categoryService: CategoyService,
    private productService: ProductService,
    private router: Router) {
    this.model = {
      productName: '',
      description: '',
      price: 0,
      discount: 0,
      totalQuantityOfProduct: 0,
      quantityInstock: 0,
      status: '',
      categoryId: 0
    }


    //get category list 
    this.categoryService.getCategory()
      .subscribe(data => this.categories = data,
        error => console.log(error),
        () => console.log('Get all complete'));
  }

  ngOnInit(): void { }

  onFormSubmit(): void {
    this.productService.createProduct(this.model)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('product/list');
        }
      });
    //alert('Product added successfully');
  }

  //category
  updateCategoryId() {
    if (this.selectedCategory) {
      this.model.categoryId = this.selectedCategory;
    }
  }

  backToList(): void {
    this.productService.getAllProducts()
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('product/list');
        }
      });
  }
}
