import { Customer } from "src/app/Customer/Model/customer.model";
import { product } from "src/app/Product/Model/product.model";

export interface addSalesOrder {
    saleDate: Date,
    quantityForSale: number,
    totalCostOfSalesOrder: number,
    salesDiscount: number,
    customerId: Customer,
    products: product[]
}