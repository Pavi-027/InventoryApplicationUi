import { Component } from '@angular/core';
import { addSalesOrder } from '../salesorder/Model/addSalesOrder.model';
import { salesOrderAdd } from '../salesorder/Model/salesOrderAdd.model';
import { product } from '../Product/Model/product.model';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SalesOrderService } from '../salesorder/service/sales-order.service';
import { Router } from '@angular/router';
import { ProductService } from '../Product/service/product.service';

@Component({
  selector: 'app-dummy-inventory',
  templateUrl: './dummy-inventory.component.html',
  styleUrls: ['./dummy-inventory.component.css']
})
export class DummyInventoryComponent {
  model: salesOrderAdd;
  products: product[] = [];
  selectedProducts: product[] = [];
  dropdownSettings: IDropdownSettings = {};
  dropDownForm: FormGroup;

  constructor(
    private salesOrderService: SalesOrderService,
    private router: Router,
    private productService: ProductService,
    private fb: FormBuilder
  ) {
    this.model = {
      saleDate: new Date(),
      quantityForSale: 0,
      totalCostOfSalesOrder: 0,
      salesDiscount: 0,
      customerId: 0,
      products: []
    };

    this.dropDownForm = this.fb.group({
      myProducts: [[]]
    });
  }

  ngOnInit(): void {
    this.productService.getAllProducts()
      .subscribe(
        data => {
          this.products = data;
          console.log("Data ", this.products);
        },
        error => console.log(error),
        () => console.log('Get all completed')
      );

    this.dropdownSettings = {
      idField: 'productId',
      textField: 'productName',
      enableCheckAll: true,
      selectAllText: 'Select All Items',
      unSelectAllText: 'Unselect All Items',
      noDataAvailablePlaceholderText: 'There is no item available',
      allowSearchFilter: true
    };
  }

  onFormSubmit() {
    this.model.products = this.selectedProducts;

    this.salesOrderService.addSales(this.model)
      .subscribe({
        next: (response) => {
          console.log('Response:', response);
          this.router.navigateByUrl('salesOrder/list');
        },
        error: (error) => {
          console.error('Error:', error);
        }
      });
  }

  onSelect() {
    this.updateTotalCost();
  }

  onQuantityChange(index: number) {
    const product = this.selectedProducts[index];

    if (isNaN(product.totalQuantityOfProduct)) {
      product.totalQuantityOfProduct = 0;
    }

    product.price = this.calculateTotalPrice(product.totalQuantityOfProduct, product.discount, product.price);

    this.updateTotalCost();
  }

  calculateTotalPrice(quantity: number, discount: number, unitPrice: number): number {
    return quantity * unitPrice * (1 - discount / 100);
  }

  updateTotalCost() {
    this.model.totalCostOfSalesOrder = this.selectedProducts.reduce(
      (sum, product) => sum + product.price,
      0
    );
  }

  backToList(): void {
    this.router.navigateByUrl('salesOrder/list');
  }
}
