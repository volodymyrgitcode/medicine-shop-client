import axios from 'axios';
import { Shop } from '../models/Shop';

class shopService {
    private static BASE_URL = 'http://localhost:3001/api/shops';

    static async getShops(): Promise<Shop[]> {
        try {
            const response = await axios.get<Shop[]>(this.BASE_URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    }

    static async getShopById(shopId: number): Promise<Shop | undefined> {
        try {
            const response = await axios.get<Shop>(`${this.BASE_URL}/${shopId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching product with ID ${shopId}:`, error);
            throw error;
        }
    }

}

export default shopService;
