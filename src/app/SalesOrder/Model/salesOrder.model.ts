import { Customer } from "src/app/Customer/Model/customer.model";
import { product } from "src/app/Product/Model/product.model";

export interface salesOrder {
    salesId: number;
    saleDate: Date;
    quantityForSale: number;
    totalCostOfSalesOrder: number;
    salesDiscount: number;
    customerId: number;
    customer: Customer,
    products: product[];
}