import { product } from "src/app/Product/Model/product.model";
import { supplier } from "src/app/Supplier/Model/supplier.model";

export interface purchaseOrder {
    purchaseId: number,
    purchaseDate: Date,
    quantityForPurchase: number,
    totalCostOfPurchaseorder: number,
    purchaseDiscount: number,
    supplierId: number,
    supplier: supplier,
    products: product[]
}