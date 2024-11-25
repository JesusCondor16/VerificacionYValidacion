import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { ProductDetails } from "../pages/ProductDetails/ProductDetails";
import { Checkout } from "../pages/Checkout/Checkout";
import { OrderCompletion } from "../pages/OrderCompletion/OrderCompletion";

export const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-completion" element={<OrderCompletion />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
