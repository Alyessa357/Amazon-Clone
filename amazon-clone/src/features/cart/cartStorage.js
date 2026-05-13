// Key used in localStorage
const CART_KEY = "amazon_cart";

// Load cart from localStorage
export const loadCart = () => {
    try {
        const data = localStorage.getItem(CART_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Error loading cart", error);
        return [];
    }
};

// Save cart to localStorage
export const saveCart = (cart) => {
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (error) {
        console.error("Error saving cart", error);
    }
};