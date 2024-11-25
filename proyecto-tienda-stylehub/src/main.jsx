import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ProductsProvider } from "./context/ProductsContext/ProductsProvider.jsx";
import { ShoppingCartProvider } from "./context/ShoppingCartContext/ShoppingCartProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ProductsProvider>
      <ShoppingCartProvider>
        <App />
      </ShoppingCartProvider>
    </ProductsProvider>
  </BrowserRouter>
);
