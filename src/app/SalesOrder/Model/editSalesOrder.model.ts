import { Customer } from "src/app/Customer/Model/customer.model";
import { product } from "src/app/Product/Model/product.model";

export interface editSalesOrder {
    saleDate: Date,
    quantityForSale: number,
    totalCostOfSalesOrder: number,
    salesDiscount: number,
    customerId: number,
    productId:
}