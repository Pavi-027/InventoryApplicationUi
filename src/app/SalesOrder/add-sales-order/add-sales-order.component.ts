import { Component, OnInit } from '@angular/core';
import { addSalesOrder } from '../Model/addSalesOrder.model';
import { SalesOrderService } from '../service/sales-order.service';
import { Router } from '@angular/router';
import { product } from 'src/app/Product/Model/product.model';
import { ProductService } from 'src/app/Product/service/product.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-sales-order',
  templateUrl: './add-sales-order.component.html',
  styleUrls: ['./add-sales-order.component.css']
})
export class AddSalesOrderComponent implements OnInit {
  model: addSalesOrder;
  products: product[] = [];
  selectedProducts?: product[];
  dropdownSettings: IDropdownSettings = {};
  dropDownForm?: FormGroup;

  constructor(private salesOrderService: SalesOrderService,
    private router: Router,
    private productService: ProductService,
    private fb: FormBuilder) {
    this.model = {
      saleDate: new Date(),
      quantityForSale: 0,
      totalCostOfSalesOrder: 0,
      salesDiscount: 0,
      customerId: 0,
      products: []
    }
  }

  ngOnInit(): void {
    this.productService.getAllProducts()
      .subscribe(data => {
        this.products = data,
          console.log("Data ", this.products);
      },
        error => console.log(error),
        () => console.log('Get all completed'));

    this.dropdownSettings = {
      idField: 'productId',
      textField: 'productName',
      enableCheckAll: true,
      selectAllText: "Select All Items",
      unSelectAllText: "Unselect All Items",
      noDataAvailablePlaceholderText: "There is no item available",
      allowSearchFilter: true
    };

    this.dropDownForm = this.fb.group({
      myProducts: [this.selectedProducts]
    })
    console.log(this.dropDownForm);
  }


  onFormSubmit() {
    const selectedProductValues = this.selectedProducts;

    if (selectedProductValues) {
      const selectedProducts: product[] = selectedProductValues;

      // Assign the array of selected product objects to this.model.products
      this.model.products = selectedProducts.map(({ productId }) => productId);
    }

    this.salesOrderService.createSalesOrder(this.model)
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

  onSelect(selectedItems: product[]) {
    this.selectedProducts = selectedItems;
  }

  backToList(): void {
    this.salesOrderService.getAllSalesOrder()
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('salesOrder/list');
        }
      });
  }
}
