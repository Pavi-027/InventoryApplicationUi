import { category } from "src/app/category/Model/category.model";

export interface product {
    productId: number,
    productName: string,
    description: string,
    productImageURL: string,
    price: number,
    discount: number,
    totalQuantityOfProduct: number,
    quantityInstock: number,
    status: string,
    //categoryId: number
    category: category
}