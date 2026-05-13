import "../styles/App.css";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Category from "./pages/Category";
import Cart from "./pages/Cart";
import CheckoutShipping from "./pages/CheckoutShipping";
import CheckoutReview from "./pages/CheckoutReview";
import OrderConfirmation from "./pages/OrderConfirmation";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/category" element={<Category />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<CheckoutShipping />} />
      <Route path="/checkout/review" element={<CheckoutReview />} />
      <Route path="/checkout/confirmation" element={<OrderConfirmation />} />
    </Routes>
  );
}

export default App;