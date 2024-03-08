import axios from 'axios';
import { Medicine } from '../models/Medicine';

class MedicineService {
    private static BASE_URL = 'http://localhost:3001/api/medicines';

    static async getMedicines(options: {
        shopIds?: string[],
        page?: number,
        perPage?: number,
        sortByPrice?: 'asc' | 'desc',
        sortByDate?: 'asc' | 'desc'
    }): Promise<{ data: Medicine[], pagination: Pagination }> {
        try {
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
                `${this.BASE_URL}?${queryParams.toString()}`
            );

            return response.data;

        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    }

    static async getMedicineById(medicineId: number): Promise<Medicine | undefined> {
        try {
            const response = await axios.get<Medicine>(`${this.BASE_URL}/${medicineId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching product with ID ${medicineId}:`, error);
            throw error;
        }
    }

}

export default MedicineService;
