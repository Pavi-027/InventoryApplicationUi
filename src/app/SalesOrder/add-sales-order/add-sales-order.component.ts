import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, numberAttribute } from '@angular/core';
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
  selectedProducts: product[] = [];
  dropdownSettings: IDropdownSettings = {};
  dropDownForm?: FormGroup;
  selectedItem: number[] = []; // Assuming product IDs are of type number


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
        this.products = data;
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

    // this.dropDownForm = this.fb.group({
    //   myProducts: []
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

  // onSelect(selectedItems: product[]) {
  //   this.selectedProducts = selectedItems;
  //   console.log('Selected Products', this.selectedProducts);
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

    this.selectedProducts = this.selectedProducts;

    console.log('Selected Products', this.selectedProducts);
    this.updateTotalCost();

    // Calculate and update the total quantity of all selected products
    const totalQuantity = this.calculateTotalQuantity();
    this.model.quantityForSale = totalQuantity;
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
    this.model.quantityForSale = totalQuantity;
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
    this.model.quantityForSale = totalQuantity;
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

  //Overall Price
  // updateTotalCost() {
  //   // Update the total cost based on the selected products and their quantities
  //   this.model.totalCostOfSalesOrder = this.selectedProducts.reduce((sum, product) => sum + (product.price || 0), 0);
  // }

  updateTotalCost() {
    let totalCost = 0;

    for (const product of this.selectedProducts) {
      const productCost = product.totalQuantityOfProduct * product.price;
      totalCost += productCost;
    }

    // Assuming you have a property in your model to store the total cost, update it
    this.model.totalCostOfSalesOrder = totalCost;
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

// onQuantityChange(index: number) {
//   const product = this.selectedProducts[index];

//   console.log(`Quantity for product ${index + 1} changed to ${product.totalQuantityOfProduct}`);

//   // Recalculate the total cost based on the updated quantity
//   product.price = this.calculateTotalPrice(product.totalQuantityOfProduct, product.price);

//   // Recalculate the total cost based on the updated quantity
//   this.model.totalCostOfSalesOrder = this.calculateTotalCost();
// }

// calculateTotalPrice(quantity: number, unitPrice: number): number {
//   // Calculate the total price for a specific product based on quantity and unit price
//   return quantity * unitPrice;
// }

// calculateTotalCost(): number {
//   // Calculate the total cost based on the selected products and their quantities
//   return this.selectedProducts.reduce(
//     (sum, product) => sum + product.price,
//     0
//   );
// }

// // Calculate total cost based on selected products
// const totalCost = selectedProducts.reduce(
//   (sum, product) => sum + product.price,
//   0
// );

// // Assign the total cost to this.model.totalCostOfSalesOrder
// this.model.totalCostOfSalesOrder = totalCost;

// // Assign the array of selected product objects to this.model.products
// this.products = selectedProducts.map(({ productId, productName, price }) => ({
//   productId,
//   productName,
//   price
// }));


// // Calculate total cost based on selected products
// const totalCost = selectedProducts.reduce(
//   (sum, product) => sum + product.price,
//   0
// );

// // Assign the total cost to this.model.totalCostOfSalesOrder
// this.model.totalCostOfSalesOrder = totalCost;