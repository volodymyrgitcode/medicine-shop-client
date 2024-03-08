import { useEffect, useState } from 'react';
import CartService from '../../services/cartService';
import { CartItem } from '../../models/CartItem';
import './Cart.css';
import OrderService from '../../services/orderService';

const NewCart = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        address: '',
        phoneNumber: ''
    });
    const [formErrors, setFormErrors] = useState({
        username: '',
        email: '',
        address: '',
        phoneNumber: ''
    });

    useEffect(() => {
        loadCartItems();
    }, []);

    const loadCartItems = () => {
        const items = CartService.getCartItems();
        setCartItems(items);
    };

    const handleRemoveItem = (id: string) => {
        const updatedItems = CartService.removeCartItem(id);
        setCartItems(updatedItems);
    };

    const calculateSubtotal = (price: string, quantity: number): number => {
        return parseFloat(price) * quantity;
    };

    const calculateTotalPrice = (): number => {
        return cartItems.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);
    };

    const handleQuantityChange = (itemId: string, newQuantity: number) => {
        const itemToUpdate = cartItems.find(item => item.id === itemId);

        if (newQuantity < 1 || !newQuantity) {
            newQuantity = 1;
        } else if (itemToUpdate && newQuantity > itemToUpdate.stock) {
            newQuantity = itemToUpdate.stock;
        }

        const updatedItems = cartItems.map(item =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedItems);

        CartService.updateCartItemQuantity(itemId, newQuantity);
    };

    const validateForm = () => {
        let isValid = true;
        const errors = {
            username: '',
            email: '',
            address: '',
            phoneNumber: ''
        };

        if (!formData.username.trim()) {
            errors.username = 'Username is required';
            isValid = false;
        }

        if (!formData.email.trim()) {
            errors.email = 'Email is required';
            isValid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            errors.email = 'Email is invalid';
            isValid = false;
        }

        if (!formData.address.trim()) {
            errors.address = 'Address is required';
            isValid = false;
        }

        if (!formData.phoneNumber.trim()) {
            errors.phoneNumber = 'Phone number is required';
            isValid = false;
        } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
            errors.phoneNumber = 'Phone number is invalid (must be 10 digits)';
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    const handleSubmitOrder = () => {
        if (validateForm()) {
            const orderDto = {
                medicines: cartItems.map(item => ({ medicineId: item.id, quantity: item.quantity })),
                ...formData,
                totalPrice: calculateTotalPrice()
            };

            OrderService.placeOrder(orderDto)
                .then((res) => {
                    // Handle the response from the server here
                    console.log('Order placed successfully!', res);
                    // Optionally, you can do something with the response, like redirecting the user to a thank you page
                })
                .catch(error => {
                    console.error('Error placing order:', error);
                });
        }
    };

    return (
        <div className="cart-container">
            <h1>Your Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div>
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map(item => (
                                <tr key={item.id}>
                                    <td><img src={item.imageUrl} alt={item.name} className="item-image" /></td>
                                    <td className="product-desc"><span className="product-name">{item.name}</span><br />{item.description}</td>
                                    <td>{item.price}</td>
                                    <td>
                                        <input
                                            type="number"
                                            value={item.quantity || 1}
                                            min="1"
                                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                        />
                                    </td>
                                    <td>{calculateSubtotal(item.price, item.quantity)}</td>
                                    <td><button onClick={() => handleRemoveItem(item.id)} className="remove-button">Remove</button></td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={4} className="total-label">Total:</td>
                                <td className="total-price" colSpan={2}>${calculateTotalPrice().toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="order-form">
                        <h2>Submit Order</h2>
                        <label>Username:</label>
                        <input type="text" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} required />
                        {formErrors.username && <span className="error">{formErrors.username}</span>}
                        <label>Email:</label>
                        <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                        {formErrors.email && <span className="error">{formErrors.email}</span>}
                        <label>Address:</label>
                        <input type="text" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                        {formErrors.address && <span className="error">{formErrors.address}</span>}
                        <label>Phone Number:</label>
                        <input type="tel" value={formData.phoneNumber} onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })} />
                        {formErrors.phoneNumber && <span className="error">{formErrors.phoneNumber}</span>}
                        <button onClick={handleSubmitOrder}>Submit Order</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewCart;
