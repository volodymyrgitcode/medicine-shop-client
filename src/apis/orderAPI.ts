import { Order } from '../models/Order';
import { axios } from './axios';

export const placeOrder = async (order: Order): Promise<void> => {
    const response = await axios.post(
        `/api/orders`,
        order);
    return response.data;
}
