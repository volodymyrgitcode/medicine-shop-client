import { placeOrder } from "../apis/orderAPI";
import { Order } from "../models/Order";


export class OrderService {
    static async placeOrder(order: Order): Promise<void> {
        try {
            const result = await placeOrder(order);
            return result;
        } catch (error: any) {
            throw new Error('Error placing order: ' + error.message);
        }
    }

}