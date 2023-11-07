import { Component, OnInit } from '@angular/core';
import { addPurchaseOrder } from '../Model/addPurchaseorder.model';
import { product } from 'src/app/Product/Model/product.model';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PurchaseOrderService } from '../service/purchase-order.service';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/Product/service/product.service';

@Component({
  selector: 'app-add-purchase-order',
  templateUrl: './add-purchase-order.component.html',
  styleUrls: ['./add-purchase-order.component.css']
})
export class AddPurchaseOrderComponent implements OnInit {
  model: addPurchaseOrder;
  products: product[] = [];
  selectedProducts?: product[];
  dropdownSettings: IDropdownSettings = {};
  dropDownForm?: FormGroup;

  constructor(private purchaseOrderService: PurchaseOrderService,
    private router: Router,
    private productService: ProductService,
    private fb: FormBuilder) {
    this.model = {
      purchaseDate: new Date(),
      quantityForPurchase: 0,
      totalCostOfPurchaseorder: 0,
      purchaseDiscount: 0,
      supplierId: 0,
      products: []
    }
  }

  ngOnInit(): void {
    this.productService.getAllProducts()
      .subscribe(data => {
        this.products = data,
          console.log("Data", this.products);
      },
        error => console.log(error),
        () => console.log('Get all Completed'));

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

    this.purchaseOrderService.createPurchaseOrder(this.model)
      .subscribe({
        next: (response) => {
          console.log('Response:', response);
          this.router.navigateByUrl('purchaseOrder/list');
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
    this.purchaseOrderService.getAllPurchaseOrder()
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('purchaseOrder/list');
        }
      });
  }
}
