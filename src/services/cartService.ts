import { CartItem } from "../models/CartItem";
import { Medicine } from "../models/Medicine";

const CART_ITEMS = 'cart'
const CART_ITEMSN = 'cartn'

class CartService {
    static getCartItemsn(): Medicine[] {
        const itemsJSON = localStorage.getItem(CART_ITEMS)
        const items: Medicine[] = itemsJSON && JSON.parse(itemsJSON) || []

        return items
    }

    static addCartItemsn(item: Medicine): Medicine[] {
        const items = this.getCartItemsn()
        items.push(item)
        localStorage.setItem(CART_ITEMS, JSON.stringify(items))

        return items;
    }

    static removeCartItemn(itemId: string): Medicine[] {
        const items = this.getCartItemsn().filter(item => item.id !== itemId);
        localStorage.setItem(CART_ITEMS, JSON.stringify(items));
        return items;
    }




    static getCartItems(): CartItem[] {
        const itemsJSON = localStorage.getItem(CART_ITEMSN);
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
            quantity: 1 // Initial quantity can be set to 1
        };

        const items = this.getCartItems();
        items.push(cartItem);
        localStorage.setItem(CART_ITEMSN, JSON.stringify(items));

        return items;
    }

    static removeCartItem(itemId: string): CartItem[] {
        const items = this.getCartItems().filter(item => item.id !== itemId);
        localStorage.setItem(CART_ITEMSN, JSON.stringify(items));
        return items;
    }

    static updateCartItemQuantity(itemId: string, newQuantity: number): CartItem[] {
        const items = this.getCartItems().map(item =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
        );
        localStorage.setItem(CART_ITEMS, JSON.stringify(items));
        return items;
    }
}

export default CartService;
