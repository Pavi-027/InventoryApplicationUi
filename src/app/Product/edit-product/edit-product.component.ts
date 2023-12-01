import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscribable, Subscription } from 'rxjs';
import { ProductService } from '../service/product.service';
import { product } from '../Model/product.model';
import { CategoyService } from 'src/app/category/service/categoy.service';
import { category } from 'src/app/category/Model/category.model';
import { editProduct } from '../Model/editProduct.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit, OnDestroy {
  productId: string | null = null;
  model?: product;
  categories$?: Observable<category[]>;
  selectedCategory?: number;

  routeSubscription?: Subscription;
  editProductSubscription?: Subscription;
  getProductSubscription?: Subscription;
  deleteProductSubscription?: Subscription;
  backToListSubscription?: Subscription;

  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private categoryService: CategoyService) {

  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategory();
    // this.categories$.subscribe(category => {
    //   console.log(category);
    // });

    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.productId = params.get('id');

        //Get Product from API
        if (this.productId) {
          this.getProductSubscription = this.productService.getProductById(this.productId)
            .subscribe({
              next: (response) => {
                this.model = response;
                this.selectedCategory = response.category.categoryId;
                console.log(this.selectedCategory);
              }
            });
        }
      }
    });
  }

  onFormSubmit(): void {
    if (this.model && this.productId) {
      var editProduct: editProduct = {
        productName: this.model.productName,
        description: this.model.description,
        price: this.model.price,
        discount: this.model.discount,
        totalQuantityOfProduct: this.model.totalQuantityOfProduct,
        quantityInstock: this.model.quantityInstock,
        status: this.model.status,
        categoryId: this.selectedCategory ?? 0

      };

      this.editProductSubscription = this.productService.updateProduct(this.productId, editProduct)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl('/product/list');
          }
        });
    }
  }

  onDelete() {
    if (this.productId) {
      this.deleteProductSubscription = this.productService.deleteProduct(this.productId)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl('product/list');
          }
        });
    }
  }

  backToList(): void {
    this.backToListSubscription = this.productService.getAllProducts()
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('product/list');
        }
      });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.editProductSubscription?.unsubscribe();
    this.getProductSubscription?.unsubscribe();
    this.deleteProductSubscription?.unsubscribe();
    this.backToListSubscription?.unsubscribe();
  }
}
