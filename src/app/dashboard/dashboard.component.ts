import { Component } from '@angular/core';
import { ProductService } from '../Product/service/product.service';
import { product } from '../Product/Model/product.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  products$?: Observable<product[]>;

  constructor(private productService: ProductService) { }

  showStationaryItems() {
    this.products$ = this.productService.getAllProducts();

  }

}
