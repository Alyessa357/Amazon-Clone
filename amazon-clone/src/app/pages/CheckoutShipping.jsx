// AI FEATURE 1 - CHECKOUT FLOW

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import CheckoutProgress from "../../components/checkout/CheckoutProgress";
import { useCheckout } from "../../features/checkout/checkoutContext";
import { DELIVERY_FEES } from "../../features/checkout/deliveryFees";
import "../../styles/CheckoutFlow.css";

const initialForm = (shipping, delivery) => ({
  fullName: shipping.fullName,
  phone: shipping.phone,
  addressLine1: shipping.addressLine1,
  addressLine2: shipping.addressLine2,
  city: shipping.city,
  province: shipping.province,
  postalCode: shipping.postalCode,
  delivery: delivery || "standard",
});

export default function CheckoutShipping() {
  const navigate = useNavigate();
  const { shipping, delivery, submitShippingStep } = useCheckout();
  const [form, setForm] = useState(() => initialForm(shipping, delivery));

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    submitShippingStep(form);
    navigate("/checkout/review");
  };

  return (
    <>
      <NavBar />
      <main className="checkout-page">
        <div className="checkout-page__inner">
          <CheckoutProgress activeId="ship" />

          <div className="checkout-layout">
            <section className="checkout-card">
              <h1>Shipping address</h1>
              <p className="checkout-card__subtitle">
                Enter where you would like your order delivered. This is a demo checkout — no real
                charges or shipments.
              </p>

              <form onSubmit={onSubmit} className="checkout-form-grid checkout-form-grid--2" noValidate>
                <div className="checkout-field checkout-field--full">
                  <label htmlFor="fullName">Full name</label>
                  <input
                    id="fullName"
                    name="fullName"
                    autoComplete="name"
                    required
                    value={form.fullName}
                    onChange={onChange}
                    placeholder="First and last name"
                  />
                </div>

                <div className="checkout-field">
                  <label htmlFor="phone">Mobile phone</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={onChange}
                    placeholder="For delivery updates"
                  />
                </div>

                <div className="checkout-field">
                  <label htmlFor="postalCode">Postal code</label>
                  <input
                    id="postalCode"
                    name="postalCode"
                    autoComplete="postal-code"
                    required
                    value={form.postalCode}
                    onChange={onChange}
                  />
                </div>

                <div className="checkout-field checkout-field--full">
                  <label htmlFor="addressLine1">Street address</label>
                  <input
                    id="addressLine1"
                    name="addressLine1"
                    autoComplete="address-line1"
                    required
                    value={form.addressLine1}
                    onChange={onChange}
                    placeholder="House number, street name"
                  />
                </div>

                <div className="checkout-field checkout-field--full">
                  <label htmlFor="addressLine2">
                    Apartment, suite, unit{" "}
                    <span className="checkout-field__hint">(optional)</span>
                  </label>
                  <input
                    id="addressLine2"
                    name="addressLine2"
                    autoComplete="address-line2"
                    value={form.addressLine2}
                    onChange={onChange}
                  />
                </div>

                <div className="checkout-field">
                  <label htmlFor="city">City / Town</label>
                  <input
                    id="city"
                    name="city"
                    autoComplete="address-level2"
                    required
                    value={form.city}
                    onChange={onChange}
                  />
                </div>

                <div className="checkout-field">
                  <label htmlFor="province">Province</label>
                  <input
                    id="province"
                    name="province"
                    autoComplete="address-level1"
                    required
                    value={form.province}
                    onChange={onChange}
                    placeholder="e.g. Gauteng"
                  />
                </div>

                <fieldset className="checkout-field checkout-field--full" style={{ border: "none", margin: 0, padding: 0 }}>
                  <legend className="checkout-field" style={{ marginBottom: 8 }}>
                    <span style={{ fontWeight: 700, fontSize: 15 }}>Delivery option</span>
                  </legend>
                  <div className="delivery-options">
                    <label className="delivery-option">
                      <input
                        type="radio"
                        name="delivery"
                        value="standard"
                        checked={form.delivery === "standard"}
                        onChange={onChange}
                      />
                      <div>
                        <div className="delivery-option__title">Standard delivery</div>
                        <div className="delivery-option__meta">
                          Arrives in 5–7 business days after dispatch.
                        </div>
                      </div>
                      <div className="delivery-option__price">
                        {DELIVERY_FEES.standard === 0 ? "FREE" : `R${DELIVERY_FEES.standard}`}
                      </div>
                    </label>
                    <label className="delivery-option">
                      <input
                        type="radio"
                        name="delivery"
                        value="express"
                        checked={form.delivery === "express"}
                        onChange={onChange}
                      />
                      <div>
                        <div className="delivery-option__title">Express delivery</div>
                        <div className="delivery-option__meta">
                          Arrives in 2–3 business days after dispatch.
                        </div>
                      </div>
                      <div className="delivery-option__price">R{DELIVERY_FEES.express}</div>
                    </label>
                  </div>
                </fieldset>

                <div className="checkout-actions checkout-field--full">
                  <Link to="/cart" className="checkout-btn checkout-btn--secondary" style={{ textDecoration: "none" }}>
                    Back to cart
                  </Link>
                  <button type="submit" className="checkout-btn checkout-btn--primary">
                    Continue to payment
                  </button>
                </div>
              </form>
            </section>

            <aside className="checkout-aside">
              <div className="checkout-card checkout-summary">
                <h1 style={{ fontSize: "1.1rem", border: "none", paddingBottom: 8 }}>Order help</h1>
                <p className="checkout-summary__muted" style={{ margin: 0 }}>
                  Your payment method is added on the next step. You can review everything before
                  placing your order.
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
