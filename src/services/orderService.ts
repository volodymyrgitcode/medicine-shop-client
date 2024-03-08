import axios, { AxiosResponse } from "axios";

class OrderService {
    private static BASE_URL = 'http://localhost:5001/api/orders';

    static async placeOrder(orderDto: OrderDto): Promise<void> {
        try {
            const response: AxiosResponse = await axios.post(this.BASE_URL, orderDto);

            if (response.status === 201) {
                return response.data;
            } else {
                console.error('Error placing order. Status code:', response.status);
                throw new Error('Error placing order');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            throw error;
        }
    }
}

export default OrderService;