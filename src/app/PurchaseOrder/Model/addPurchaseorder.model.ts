import { product } from "src/app/Product/Model/product.model";

export interface addPurchaseOrder {
    purchaseDate: Date,
    quantityForPurchase: number,
    totalCostOfPurchaseorder: number,
    purchaseDiscount: number,
    supplierId: number,
    products: number[]
}