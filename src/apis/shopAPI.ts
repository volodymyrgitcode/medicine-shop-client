import { Shop } from '../models/Shop';
import { axios } from './axios';

export const getShops = async (): Promise<Shop[]> => {

    const response = await axios.get<Shop[]>('/api/shops');

    return response.data;

};

export const getShopById = async (shopId: string): Promise<Shop> => {
    const response = await axios.get<Shop>(
        `/api/shops/${shopId}`
    );
    return response.data;
};