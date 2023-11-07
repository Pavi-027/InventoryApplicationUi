import { product } from "src/app/Product/Model/product.model";

export interface addSalesOrder {
    saleDate: Date;
    quantityForSale: number;
    totalCostOfSalesOrder: number;
    salesDiscount: number;
    customerId: number;
    //customer: Customer;
    products: number[];
}