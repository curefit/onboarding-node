import {OrderProduct} from "./OrderProduct";
import {Address} from "./Address";

export interface Order {
    userId: string
    products: OrderProduct[]
    address: Address
    price: number
}