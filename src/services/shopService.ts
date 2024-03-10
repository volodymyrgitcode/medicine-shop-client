import { getShops, getShopById } from "../apis/shopAPI";
import { Shop } from "../models/Shop";

export interface MedicineServiceOptions {
    shopIds?: string[];
    page?: number;
    perPage?: number;
    sortByPrice?: 'asc' | 'desc';
    sortByDate?: 'asc' | 'desc';
}

export class ShopService {
    static async getShops(): Promise<Shop[]> {
        try {
            const result = await getShops();
            return result;
        } catch (error: any) {
            throw new Error('Error fetching shops: ' + error.message);
        }
    }

    static async getShopById(shopId: string): Promise<Shop> {
        try {
            const result = await getShopById(shopId);
            return result;
        } catch (error: any) {
            throw new Error(`Error fetching shop with ID ${shopId}: ` + error.message);
        }
    }
}