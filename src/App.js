// import classes from "./styles/App.module.css";
import { Routes, Route } from "react-router-dom";

import Nav from "./components/Nav";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import AboutPage from "./pages/AboutPage";
import CheckoutPage from "./pages/CheckoutPage";
import SingleProductPage from "./pages/SingleProductPage";
import ErrorPage from "./pages/ErrorPage";
import CartPage from "./pages/CartPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { products_url } from "./utils/constants";
import { productsAction, loadingActions } from "./store/store";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      dispatch(loadingActions.setIsLoadingToTrue());
      const res = await fetch(products_url);
      const data = await res.json();
      const relevantData = data.map((product) => {
        return {
          id: product.id,
          image: product.image,
          name: product.name,
          price: product.price / 100,
          description: product.description,
          category: product.category,
          company: product.company,
          colors: product.colors,
          freeShipping: product.hasOwnProperty("shipping") ? true : false,
        };
      });
      dispatch(productsAction.setAllProducts(relevantData));
      dispatch(loadingActions.setIsLoadingToFalse());
    })();
  }, [dispatch]);
  return (
    <main>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="product/:id" element={<SingleProductPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
