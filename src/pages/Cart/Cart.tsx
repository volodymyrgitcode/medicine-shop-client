import { useEffect, useState } from "react";
import { CartItem } from "../../models/CartItem";
import { CartService } from "../../services/cartService";
import "./Cart.css";
import { OrderService } from "../../services/orderService";
import { Order } from "../../models/Order";
import { useNavigate } from 'react-router-dom';

export function Cart() {

    const navigate = useNavigate();
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

        if (cartItems.length <= 0) {
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    const handleSubmitOrder = () => {
        if (validateForm()) {
            const order: Order = {
                medicines: cartItems.map(item => ({ medicineId: item.id, quantity: item.quantity })),
                ...formData,
                totalPrice: calculateTotalPrice()
            };

            console.log(order);

            OrderService.placeOrder(order)
                .then((res) => {
                    console.log('Order placed successfully!', res);
                    CartService.resetCartItems();
                    navigate("/");
                })
        }
    };

    if (cartItems.length <= 0) {
        return (
            <>
                <div className="empty-cart-container">
                    <h1>Your cart is empty right now.</h1>
                    <p>Explore products section and add items to your shopping cart</p>
                    <button className="button-primary" onClick={() => navigate('/')}>
                        Start Shopping
                    </button>
                </div>
            </>
        );
    }

    return (
        <>
            <h1>
                Your shopping cart
            </h1>
            <>
                <div className="cart-container">

                    {
                        cartItems.map(item => (
                            <div className="cart-item-container" key={item.id}>
                                <div className="cart-item-img-container">
                                    <img src={item.imageUrl} alt={item.name} className="" />
                                </div>
                                <div className="cart-item-details">
                                    <h2 className="cart-item-name">{item.name}</h2>
                                    <p className="cart-item-description">{item.description}</p>
                                </div>
                                <p className="cart-item-price">{item.price}</p>
                                <input
                                    type="number"
                                    value={item.quantity}
                                    min="1"
                                    onChange={(e) => { handleQuantityChange(item.id, Number(e.target.value)) }}
                                />
                                <p className="cart-item-subtotal">{(calculateSubtotal(item.price, item.quantity)).toFixed(2)}</p>
                                <button
                                    className="button-primary"
                                    onClick={() => handleRemoveItem(item.id)}
                                >
                                    Remove
                                </button>
                            </div>

                        ))
                    }

                    <div className="total-container">
                        <h3>
                            Total price:
                        </h3>
                        <p>
                            ${calculateTotalPrice().toFixed(2)}
                        </p>
                    </div>
                </div>

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
                    <button
                        className="button-primary"
                        onClick={handleSubmitOrder}
                    >Submit Order
                    </button>
                </div>
            </>

        </>
    );
}