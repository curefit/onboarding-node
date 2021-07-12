import {inject, injectable} from "inversify";
import {BASE_TYPES, ILogger} from "@curefit/base";
import {TYPES} from "../ioc/types";
import {IOrderReadWriteDao} from "../dao/IOrderDao";
import {Order} from "../common/Order";
import {CreateOrderParams} from "../common/CreateOrderParams";
import {IOrderService} from "./IOrderService";
import {IProductService} from "./IProductService";
import {OrderProduct} from "../common/OrderProduct";
import {Product} from "../common/Product";

@injectable()
export class OrderService implements IOrderService {
    constructor(@inject(BASE_TYPES.ILogger) private logger: ILogger,
                @inject(TYPES.OrderReadwriteDao) private orderReadWriteDao: IOrderReadWriteDao,
                @inject(TYPES.ProductService) private productService: IProductService
    ) {
    }

    public async createOrder(createOrderParams: CreateOrderParams): Promise<Order>{
        const order: Order = {
            userId: createOrderParams.userId,
            address: createOrderParams.address,
            products: [],
            price: null
        }

        for (const productInfo of createOrderParams.products) {
            const product: Product = await this.productService.getProduct(productInfo.productId)
            const orderProduct: OrderProduct = {
                productId: product.id,
                title: product.name,
                quantity: productInfo.quantity,
                price: product.price
            }
            order.products.push(orderProduct)
        }

        order.price = order.products.map(orderProduct => orderProduct.price * orderProduct.quantity)
                                    .reduce((p1, p2) => p1 + p2)

        return this.orderReadWriteDao.create(order)
    }
}