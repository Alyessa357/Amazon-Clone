// AI FEATURE 1 - CHECKOUT FLOW

import { useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import CheckoutProgress from "../../components/checkout/CheckoutProgress";
import { useCartContext } from "../../features/cart/cartContext";
import { useCheckout } from "../../features/checkout/checkoutContext";
import { DELIVERY_FEES } from "../../features/checkout/deliveryFees";
import "../../styles/CheckoutFlow.css";

function formatAddress(s) {
  const line2 = s.addressLine2 ? `${s.addressLine2}, ` : "";
  return `${s.fullName}\n${line2}${s.addressLine1}\n${s.city}, ${s.province} ${s.postalCode}${s.phone ? `\n${s.phone}` : ""}`;
}

export default function CheckoutReview() {
  const navigate = useNavigate();
  const { cart, total, clearCart } = useCartContext();
  const { shipping, delivery, shippingStepComplete, completeOrder } = useCheckout();

  useEffect(() => {
    if (!shippingStepComplete) {
      navigate("/checkout", { replace: true });
    }
  }, [shippingStepComplete, navigate]);

  useEffect(() => {
    if (shippingStepComplete && cart.length === 0) {
      navigate("/cart", { replace: true });
    }
  }, [shippingStepComplete, cart.length, navigate]);

  const shippingFee = DELIVERY_FEES[delivery] ?? 0;
  const orderTotal = total + shippingFee;

  const itemCount = useMemo(
    () => cart.reduce((sum, item) => sum + (item.quantity || 1), 0),
    [cart]
  );

  const handlePlaceOrder = () => {
    const id = `AMZ-${Date.now().toString(36).toUpperCase()}`;
    const items = cart.map((item) => ({
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      img: item.img,
    }));

    completeOrder({
      id,
      placedAt: new Date().toISOString(),
      shipping: { ...shipping },
      delivery,
      items,
      subtotal: total,
      shippingFee,
      total: orderTotal,
      itemCount,
    });

    clearCart();
    navigate("/checkout/confirmation", { replace: true });
  };

  if (!shippingStepComplete || cart.length === 0) {
    return (
      <>
        <NavBar />
        <main className="checkout-page">
          <div className="checkout-page__inner empty-checkout">
            <p>Redirecting…</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavBar />
      <main className="checkout-page">
        <div className="checkout-page__inner">
          <CheckoutProgress activeId="pay" />

          <div className="checkout-layout">
            <section className="checkout-card">
              <h1>Review &amp; pay</h1>
              <p className="checkout-card__subtitle">
                Confirm your details and place your order. No real payment is processed in this
                demo.
              </p>

              <div className="review-section">
                <h2>Ship to</h2>
                <div className="review-block" style={{ whiteSpace: "pre-line" }}>
                  {formatAddress(shipping)}
                </div>
              </div>

              <div className="review-section">
                <h2>Delivery speed</h2>
                <div className="review-block">
                  {delivery === "express" ? "Express delivery" : "Standard delivery"}
                  <span className="checkout-summary__muted">
                    {" "}
                    — {shippingFee === 0 ? "FREE" : `R${shippingFee}`}
                  </span>
                </div>
              </div>

              <div className="review-section">
                <h2>Payment method</h2>
                <div className="review-block">
                  <div className="payment-row">
                    <span className="payment-badge">Demo</span>
                    <span>
                      <strong>Visa</strong> ending in 4242
                    </span>
                  </div>
                  <p className="checkout-summary__muted" style={{ marginTop: 12, marginBottom: 0 }}>
                    Billing name matches shipping. For this clone, card details are simulated only.
                  </p>
                </div>
              </div>

              <div className="review-section">
                <h2>Items in your order</h2>
                <div className="checkout-order-lines">
                  {cart.map((item) => (
                    <div className="checkout-order-line" key={item.title}>
                      <img src={item.img} alt="" />
                      <div>
                        <div style={{ fontWeight: 600 }}>{item.title}</div>
                        <div className="checkout-summary__muted">Qty {item.quantity}</div>
                      </div>
                      <div style={{ fontWeight: 700 }}>R{item.price * item.quantity}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="checkout-actions">
                <Link
                  to="/checkout"
                  className="checkout-btn checkout-btn--secondary"
                  style={{ textDecoration: "none" }}
                >
                  Back to shipping
                </Link>
                <button type="button" className="checkout-btn checkout-btn--cta" onClick={handlePlaceOrder}>
                  Place your order
                </button>
              </div>
            </section>

            <aside className="checkout-aside">
              <div className="checkout-card checkout-summary">
                <h1 style={{ fontSize: "1.1rem", border: "none", paddingBottom: 8 }}>Order summary</h1>
                <div className="checkout-summary__row">
                  <span>Items ({itemCount})</span>
                  <span>R{total}</span>
                </div>
                <div className="checkout-summary__row">
                  <span>Shipping &amp; handling</span>
                  <span>{shippingFee === 0 ? "FREE" : `R${shippingFee}`}</span>
                </div>
                <div className="checkout-summary__row checkout-summary__row--emph">
                  <span>Order total</span>
                  <span>R{orderTotal}</span>
                </div>
                <p className="checkout-summary__muted" style={{ marginTop: 12, marginBottom: 0 }}>
                  By placing your order you agree to our demo terms. No charge will be made.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
