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
  selectedProducts: product[] = [];
  dropdownSettings: IDropdownSettings = {};
  dropDownForm?: FormGroup;
  selectedItem: number[] = []; // Assuming product IDs are of type number

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

    // this.dropDownForm = this.fb.group({
    //   myProducts: [this.selectedProducts]
    // })
    //console.log(this.dropDownForm);
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

  // onSelect(selectedItems: product[]) {
  //   this.selectedProducts = selectedItems;
  // }

  onSelect() {
    // Map the prices of the selected items
    this.selectedProducts = this.selectedItem.map((itemId: any) => {
      // Find the corresponding product from the original product list
      const selectedProduct = this.getPriceByProductId(itemId.productId)
      console.log(this.products);
      // If the product is found, update the selected product with its details
      if (selectedProduct) {
        return {
          ...selectedProduct,
          totalQuantityOfProduct: 1,
          price: selectedProduct.price
        };
      }

      return null; // Return null if the product is not found
    }).filter(Boolean) as product[]; // Remove null values from the array

    console.log('Selected Products', this.selectedProducts);
    this.updateTotalCost();

    // Calculate and update the total quantity of all selected products
    const totalQuantity = this.calculateTotalQuantity();
    this.model.quantityForPurchase = totalQuantity;
  }

  onDeSelect() {
    // // Handle the event when a product is unchecked in the dropdown
    // Map the prices of the selected items
    this.selectedProducts = this.selectedItem.map((itemId: any) => {
      const selectedProduct = this.getPriceByProductId(itemId.productId);

      if (selectedProduct) {
        return {
          ...selectedProduct,
          totalQuantityOfProduct: 1,
          price: selectedProduct.price
        };
      }

      return null;
    }).filter(Boolean) as product[];

    console.log('Selected Products', this.selectedProducts);
    this.updateTotalCost();

    // Calculate and update the total quantity of all selected products
    const totalQuantity = this.calculateTotalQuantity();
    this.model.quantityForPurchase = totalQuantity;
  }

  getPriceByProductId(productId: number): product | undefined {
    const product = this.products.find((item: product) => item.productId === productId);
    return product ? product : undefined;
  }

  onQuantityChange(index: number) {
    const product = this.selectedProducts[index];
    console.log(`Quantity for product ${index + 1} changed to ${product.totalQuantityOfProduct}`);

    // Ensure totalQuantityOfProduct is a valid number
    if (isNaN(product.totalQuantityOfProduct)) {
      product.totalQuantityOfProduct = 0; // or handle this case appropriately
    }

    // Recalculate the total price based on the updated quantity
    // product.price = this.calculateTotalPrice(product.totalQuantityOfProduct, product.price);
    // console.log(`Calculated price for product ${index + 1}: ${product.price}`);

    // Update the total cost in the form
    this.updateTotalCost();

    // Calculate and update the total quantity of all selected products
    const totalQuantity = this.calculateTotalQuantity();
    this.model.quantityForPurchase = totalQuantity;
  }

  calculateTotalQuantity(): number {
    // Calculate the total quantity based on the selected products
    return this.selectedProducts.reduce((sum, product) => sum + (product.totalQuantityOfProduct || 0), 0);
  }

  //Price of a particular product according to the quantity
  calculateTotalPrice(quantity: number, unitPrice: number): number {
    if (isNaN(quantity) || isNaN(unitPrice)) {
      return 0; // or handle this case appropriately
    }
    // Calculate the total price for a specific product based on quantity and unit price
    return quantity * unitPrice;
  }

  updateTotalCost() {
    let totalCost = 0;

    for (const product of this.selectedProducts) {
      const productCost = product.totalQuantityOfProduct * product.price;
      totalCost += productCost;
    }

    // Assuming you have a property in your model to store the total cost, update it
    this.model.totalCostOfPurchaseorder = totalCost;
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
