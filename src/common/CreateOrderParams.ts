import {Address} from "./Address";

export interface CreateOrderParams {
    userId: string
    products: {
        productId: string
        quantity: number
    }[]
    address: Address
}