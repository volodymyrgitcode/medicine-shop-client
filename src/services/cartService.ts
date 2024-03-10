import { CartItem } from "../models/CartItem";
import { Medicine } from "../models/Medicine";


const CART_ITEMS = 'cart'

export class CartService {

    static getCartItems(): CartItem[] {
        const itemsJSON = localStorage.getItem(CART_ITEMS);
        const items: CartItem[] = itemsJSON ? JSON.parse(itemsJSON) : [];

        return items;
    }

    static addCartItem(medicine: Medicine): CartItem[] {
        const cartItem: CartItem = {
            id: medicine.id,
            name: medicine.name,
            description: medicine.description,
            imageUrl: medicine.imageUrl,
            price: medicine.price,
            stock: medicine.stock,
            quantity: 1
        };

        const items = this.getCartItems();
        items.push(cartItem);
        localStorage.setItem(CART_ITEMS, JSON.stringify(items));

        return items;
    }

    static removeCartItem(itemId: string): CartItem[] {
        const items = this.getCartItems().filter(item => item.id !== itemId);
        localStorage.setItem(CART_ITEMS, JSON.stringify(items));
        return items;
    }

    static updateCartItemQuantity(itemId: string, newQuantity: number): CartItem[] {
        const items = this.getCartItems().map(item =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
        );
        localStorage.setItem(CART_ITEMS, JSON.stringify(items));
        return items;
    }

    static resetCartItems(): void {
        localStorage.removeItem(CART_ITEMS);
    }
}