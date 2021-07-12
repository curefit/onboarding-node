import {Product} from "../common/Product";

export interface IProductService {
    getProduct(productId: string): Promise<Product>
}