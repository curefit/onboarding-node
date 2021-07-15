import {inject, injectable} from "inversify";
import {BASE_TYPES, ILogger} from "@curefit/base";
import {FetchUtilV2} from "@curefit/base";
import {Product} from "../common/Product";
import {IProductService} from "./IProductService";
import fetch from "node-fetch"

@injectable()
export class ProductService implements IProductService {
    private static baseUrl = "http://localhost:8080/product"
    constructor(@inject(BASE_TYPES.ILogger) private logger: ILogger,
                @inject(BASE_TYPES.FetchUtilV2) private fetchUtil: FetchUtilV2
    ) {
    }

    private static getProductUrl(productId: string) {
        return `${ProductService.baseUrl}/${productId}/`
    }

    public async getProduct(productId: string): Promise<Product> {
        // const response = await fetch(ProductService.getProductUrl(productId), this.fetchUtil.get())
        // return this.fetchUtil.parseResponse<Product>(response)
        return {
            id: productId,
            name: "Product title",
            description: "Description",
            price: 100,
            type: "Shirt",
            imageUrl: "url"
        }
    }
}