export interface Order {
    medicines: { medicineId: string, quantity: number }[];
    username: string;
    email: string;
    address: string;
    phoneNumber: string;
    totalPrice: number;
}