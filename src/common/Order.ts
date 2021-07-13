import {Product} from "./Product";
import {Address} from "./Address";

export interface Order {
    userId: string,
    orderId: string,
    products: [Product],
    address: Address,
    price: number
}