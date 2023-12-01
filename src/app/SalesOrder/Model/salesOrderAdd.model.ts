import { product } from "src/app/Product/Model/product.model";

export interface salesOrderAdd {
    saleDate: Date;
    quantityForSale: number;
    totalCostOfSalesOrder: number;
    salesDiscount: number;
    customerId: number;
    products: product[];
}