import { useState, useEffect } from "react";
import { loadCart, saveCart } from "../features/cart/cartStorage";

const useCart = () => {

    // Load cart from localStorage on first render
    const [cart, setCart] = useState(loadCart());

    // Save cart every time it changes
    useEffect(() => {
        saveCart(cart);
    }, [cart]);

    const addToCart = (item) => {
        setCart(prev => {
            // Check if item already exists
            const existing = prev.find(i => i.title === item.title);

            if (existing) {
                // Increase quantity
                return prev.map(i =>
                    i.title === item.title
                        ? { ...i, quantity: (i.quantity || 1) + 1 }
                        : i
                );
            }

            // Add new item
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (item) => {
        setCart(prev =>
            prev
                .map(i =>
                    i.title === item.title
                        ? { ...i, quantity: i.quantity - 1 }
                        : i
                )
                .filter(i => i.quantity > 0)
        );
    };

     const deleteItem = (itemToDelete) => {
        setCart(cart.filter(item => item.id !== itemToDelete.id));
    }

    const clearCart = () => {
        setCart([]);
    };

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return { cart, addToCart, removeFromCart, clearCart,  deleteItem, total };
};

export default useCart;