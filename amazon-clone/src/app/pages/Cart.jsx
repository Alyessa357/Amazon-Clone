import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Recommendations from "../../components/Recommendations";

import { useCartContext } from "../../features/cart/cartContext"
import { useCheckout } from "../../features/checkout/checkoutContext";

import "../../styles/Cart.css";

const Cart = () => {

    const {cart, total, removeFromCart, addToCart, deleteItem, clearCart} = useCartContext();
    const { dismissCompletedOrder } = useCheckout();

    return(
        <>
            <NavBar/>

            <div className="cart-page">
                
                <section className="cart-container">

                    <div className="cart-left">
                        <div className="cart-left-content">

                            <h2>Shopping Cart</h2>

                            <div className="price-title">
                                <span>Price</span>
                            </div>
                        
                            {cart.length === 0 && <p>Your Amazon cart is empty</p>}

                            {cart.map((item) => (
                                <div className="cart-item" key={item.title}>

                                    <img src={item.img} alt={item.title} />

                                    <div className="item-info">

                                        <h4>{item.title}</h4>
                                        <span> Rating: {item.rating} ⭐</span>
                                        <span>Sales: {item.sales}</span>
                                        
                                        <div className="cart-actions">
                                            {/* Quantity selector - Manual Feature */}
                                            <div className="quantity-selector">
                                                <button onClick={() => removeFromCart(item)}>-</button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => addToCart(item)}>+</button>
                                            </div>

                                            <button className="delete-btn" onClick={() => deleteItem(item)}>Delete</button>
                                        </div>

                                    </div>

                                    <div className="item-price-block">
                                        <span>R{item.price.toFixed(2)}</span> 
                                    </div>

                                </div>
                            ))}

                            <div className="subtotal-line">
                                <span>Subtotal:</span>
                                <span className="total-price"> R{total.toFixed(2)}</span>
                            </div>

                        </div>

                        <div className="cart-bottom-spacer"></div>

                        <p className="cart-disclaimer">
                            The price and availability of items at Amazon.com are subject to change. The Cart is a temporary place to store a list of your items and reflects each item's most recent price. 
                            <a href=""> Learn more</a> 
                            <br /> Do you have a gift card or promotional code? We'll ask you to enter your claim code when it's time to pay.
                        </p>
                    </div>

                    <div className="cart-right">
                        
                        <div className="subtotal">
                            <span>Subtotal:</span>
                            <span className="total-price"> R{total.toFixed(2)}</span>
                        </div>

                        <div className="gift">
                            <label>
                                <input type="checkbox" />
                                This order contains a gift
                            </label>
                        </div>

                        {cart.length === 0 ? (
                            <button type="button" className="checkout-btn" disabled>
                                Proceed to Checkout
                            </button>
                        ) : (
                            <Link
                                to="/checkout"
                                className="checkout-btn"
                                onClick={() => dismissCompletedOrder()}
                            >
                                Proceed to Checkout
                            </Link>
                        )}

                        <button onClick={clearCart} className="delete">Clear Cart</button>
                    </div>

                </section>

                <Recommendations/>

                <Footer/>
            </div>
        </>
    )
}

export default Cart;


