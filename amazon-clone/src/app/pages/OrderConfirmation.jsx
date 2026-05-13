// AI FEATURE 1 - CHECKOUT FLOW

import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import CheckoutProgress from "../../components/checkout/CheckoutProgress";
import { useCheckout } from "../../features/checkout/checkoutContext";
import "../../styles/CheckoutFlow.css";

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

export default function OrderConfirmation() {
  const navigate = useNavigate();
  const { completedOrder, dismissCompletedOrder } = useCheckout();

  useEffect(() => {
    if (!completedOrder) {
      navigate("/cart", { replace: true });
    }
  }, [completedOrder, navigate]);

  if (!completedOrder) {
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

  const { id, placedAt, shipping, delivery, items, subtotal, shippingFee, total, itemCount } =
    completedOrder;

  return (
    <>
      <NavBar />
      <main className="checkout-page">
        <div className="checkout-page__inner">
          <CheckoutProgress activeId="done" disableStepLinks />

          <section className="checkout-card">
            <div className="confirm-hero">
              <div className="confirm-hero__icon" aria-hidden>
                ✓
              </div>
              <h1>Thank you, your order has been placed</h1>
              <p>
                Confirmation <strong>{id}</strong> · {formatDate(placedAt)}
              </p>
            </div>

            <div className="confirm-details">
              <p className="checkout-card__subtitle" style={{ textAlign: "center", marginBottom: 24 }}>
                We will send a demo confirmation email to the address on your account. No payment
                was taken.
              </p>

              <div className="confirm-grid">
                <div>
                  <h2 style={{ fontSize: "1rem", margin: "0 0 8px" }}>Shipping to</h2>
                  <div className="review-block" style={{ whiteSpace: "pre-line" }}>
                    {shipping.fullName}
                    {"\n"}
                    {shipping.addressLine2 ? `${shipping.addressLine2}\n` : ""}
                    {shipping.addressLine1}
                    {"\n"}
                    {shipping.city}, {shipping.province} {shipping.postalCode}
                    {shipping.phone ? `\n${shipping.phone}` : ""}
                  </div>
                </div>
                <div>
                  <h2 style={{ fontSize: "1rem", margin: "0 0 8px" }}>Delivery</h2>
                  <div className="review-block">
                    {delivery === "express" ? "Express delivery" : "Standard delivery"}
                    <div className="checkout-summary__muted" style={{ marginTop: 8 }}>
                      {itemCount} item{itemCount === 1 ? "" : "s"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="review-section">
                <h2 style={{ fontSize: "1rem", margin: "0 0 8px" }}>Order summary</h2>
                <div className="checkout-order-lines" style={{ maxHeight: "none" }}>
                  {items.map((item) => (
                    <div className="checkout-order-line" key={`${item.title}-${item.quantity}`}>
                      <img src={item.img} alt="" />
                      <div>
                        <div style={{ fontWeight: 600 }}>{item.title}</div>
                        <div className="checkout-summary__muted">Qty {item.quantity}</div>
                      </div>
                      <div style={{ fontWeight: 700 }}>R{item.price * item.quantity}</div>
                    </div>
                  ))}
                </div>
                <div className="checkout-summary" style={{ marginTop: 16 }}>
                  <div className="checkout-summary__row">
                    <span>Subtotal</span>
                    <span>R{subtotal}</span>
                  </div>
                  <div className="checkout-summary__row">
                    <span>Shipping</span>
                    <span>{shippingFee === 0 ? "FREE" : `R${shippingFee}`}</span>
                  </div>
                  <div className="checkout-summary__row checkout-summary__row--emph">
                    <span>Total</span>
                    <span>R{total}</span>
                  </div>
                </div>
              </div>

              <div className="checkout-actions" style={{ justifyContent: "center", marginTop: 32 }}>
                <Link
                  to="/"
                  className="checkout-btn checkout-btn--primary"
                  style={{ textDecoration: "none" }}
                  onClick={() => dismissCompletedOrder()}
                >
                  Continue shopping
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
