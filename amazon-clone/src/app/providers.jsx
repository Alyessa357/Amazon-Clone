import useCart from "../hooks/useCart";
import { CartContext } from "../features/cart/cartContext";
import { CheckoutProvider } from "../features/checkout/checkoutContext";

export function CartProvider({ children }) {
  const cartService = useCart();

  return (
    <CartContext.Provider value={cartService}>
      <CheckoutProvider>{children}</CheckoutProvider>
    </CartContext.Provider>
  );
}