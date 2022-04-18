import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom";
import { StrictMode, useState, useEffect } from "react";

import { Layout } from "antd";
import "antd/dist/antd.css";

import { Header, Content, Footer } from "../layout";

import CartContext from "../contexts/CartContext";
import ProductsContext from "../contexts/ProductsContext";

const App = () => {
  const productsHook = useState([]);
  const [products, updateProducts] = productsHook;

  const cartHook = useState([]);
  const [cart] = cartHook;

  // Fetch products
  useEffect(async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const newProducts = await res.json();
    updateProducts(newProducts);
  }, []);

  return (
    <CartContext.Provider value={cartHook}>
      <ProductsContext.Provider value={productsHook}>
        <div id="app">
          <Router>
            <Layout style={{ minHeight: "100vh" }}>
              <Header cart={cart} />
              <Content />
              <Footer />
            </Layout>
          </Router>
        </div>
      </ProductsContext.Provider>
    </CartContext.Provider>
  );
};

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
