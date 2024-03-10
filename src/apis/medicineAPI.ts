import { Medicine } from '../models/Medicine';
import { Pagination } from '../models/Pagination';
import { axios } from './axios';

export const getMedicines = async (options: {
    shopIds?: string[],
    page?: number,
    perPage?: number,
    sortByPrice?: 'asc' | 'desc',
    sortByDate?: 'asc' | 'desc'
}): Promise<{ data: Medicine[], pagination: Pagination }> => {

    const queryParams = new URLSearchParams();

    const page = options.page || 1;
    queryParams.append('page', page.toString());

    const perPage = options.perPage || 20;
    queryParams.append('perPage', perPage.toString());

    if (options.shopIds && options.shopIds.length > 0) {
        queryParams.append('shopIds', options.shopIds.join(','));
    }

    if (options.sortByPrice) {
        queryParams.append('sortByPrice', options.sortByPrice);
    }

    if (options.sortByDate) {
        queryParams.append('sortByDate', options.sortByDate);
    }

    const response = await axios.get<{ data: Medicine[], pagination: Pagination }>(
        `/api/medicines?${queryParams.toString()}`
    );

    return response.data;

};

export const getMedicineById = async (medicineId: string): Promise<Medicine | undefined> => {
    const response = await axios.get<Medicine>(
        `/api/medicines/${medicineId}`
    );
    return response.data;
};