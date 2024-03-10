import { getMedicines, getMedicineById } from "../apis/medicineAPI";
import { Medicine } from "../models/Medicine";
import { Pagination } from "../models/Pagination";

export interface MedicineServiceOptions {
    shopIds?: string[];
    page?: number;
    perPage?: number;
    sortByPrice?: 'asc' | 'desc';
    sortByDate?: 'asc' | 'desc';
}

export class MedicineService {
    static async getMedicines(options: MedicineServiceOptions): Promise<{ data: Medicine[], pagination: Pagination }> {
        try {
            const result = await getMedicines(options);
            return result;
        } catch (error: any) {
            throw new Error('Error fetching medicines: ' + error.message);
        }
    }

    static async getMedicineById(medicineId: string): Promise<Medicine | undefined> {
        try {
            const result = await getMedicineById(medicineId);
            console.log(result);
            return result;
        } catch (error: any) {
            throw new Error(`Error fetching medicine with ID ${medicineId}: ` + error.message);
        }
    }
}