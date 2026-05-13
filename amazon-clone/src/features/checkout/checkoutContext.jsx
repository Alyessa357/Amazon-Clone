// AI FEATURE 1 - CHECKOUT FLOW

/* eslint-disable react-refresh/only-export-components -- provider + hook module */
import { createContext, useCallback, useContext, useMemo, useState } from "react";

const STORAGE_KEY = "amazonCloneCheckoutLastOrder";

const defaultShipping = {
  fullName: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  province: "",
  postalCode: "",
};

const CheckoutContext = createContext(null);

function readStoredOrder() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function CheckoutProvider({ children }) {
  const [shipping, setShipping] = useState(defaultShipping);
  const [delivery, setDelivery] = useState("standard");
  const [shippingStepComplete, setShippingStepComplete] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(() => readStoredOrder());

  const updateShipping = useCallback((patch) => {
    setShipping((prev) => ({ ...prev, ...patch }));
  }, []);

  const submitShippingStep = useCallback(
    (payload) => {
      setShipping({
        fullName: payload.fullName,
        phone: payload.phone,
        addressLine1: payload.addressLine1,
        addressLine2: payload.addressLine2 || "",
        city: payload.city,
        province: payload.province,
        postalCode: payload.postalCode,
      });
      setDelivery(payload.delivery);
      setShippingStepComplete(true);
    },
    []
  );

  const resetCheckoutDraft = useCallback(() => {
    setShipping(defaultShipping);
    setDelivery("standard");
    setShippingStepComplete(false);
  }, []);

  const dismissCompletedOrder = useCallback(() => {
    setCompletedOrder(null);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const completeOrder = useCallback((order) => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(order));
    } catch {
      /* ignore */
    }
    setCompletedOrder(order);
    setShippingStepComplete(false);
  }, []);

  const value = useMemo(
    () => ({
      shipping,
      delivery,
      shippingStepComplete,
      completedOrder,
      setDelivery,
      updateShipping,
      submitShippingStep,
      resetCheckoutDraft,
      completeOrder,
      dismissCompletedOrder,
    }),
    [
      shipping,
      delivery,
      shippingStepComplete,
      completedOrder,
      updateShipping,
      submitShippingStep,
      resetCheckoutDraft,
      completeOrder,
      dismissCompletedOrder,
    ]
  );

  return (
    <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext);
  if (!ctx) {
    throw new Error("useCheckout must be used within CheckoutProvider");
  }
  return ctx;
}
