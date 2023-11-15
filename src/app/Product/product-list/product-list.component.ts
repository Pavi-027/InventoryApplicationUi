import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Observable } from 'rxjs';
import { product } from '../Model/product.model';
import { CategoyService } from 'src/app/category/service/categoy.service';
import { category } from 'src/app/category/Model/category.model';
import { ThemeService } from 'src/app/theme.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  product$?: Observable<product[]>;

  constructor(private productService: ProductService,
    private themeService: ThemeService) { }


  ngOnInit(): void {
    this.product$ = this.productService.getAllProducts();

    //console products from observable
    this.product$.subscribe(products => {
      console.log(products);
    });
  }
}
