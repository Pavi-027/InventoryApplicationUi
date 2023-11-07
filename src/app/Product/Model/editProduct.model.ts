import { category } from "src/app/category/Model/category.model"

export interface editProduct {
    productName: string,
    description: string,
    productImageURL: string,
    price: number,
    discount: number,
    totalQuantityOfProduct: number,
    quantityInstock: number,
    status: string
    categoryId: number;
}