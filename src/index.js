import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Trending from './Pages/Trending';
import Best from './Pages/Best';
import Deals from './Pages/Deals';
import Preview from './Pages/Preview';
import WishList from './Pages/WishList';
import { WishListProvider } from './Components/WishListContext';
import { CartProvider } from './Components/CartContext';
import Checkout from './Pages/Checkout';
import ScrollToTop from './Components/ScrollToTop';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <WishListProvider>
    <CartProvider>
    <Router>
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Trending" element={<Trending />} />
        <Route path="/Deals-for-Today" element={<Deals />} />
        <Route path="/Best-sellers" element={<Best />} />
        <Route path="/Preview/:productId" element={<Preview />} />
        <Route path="/Wish-list" element={<WishList />} />
        <Route path="/Checkout" element={<Checkout />} />
        </Routes>
    </Router>
    </CartProvider>
  </WishListProvider>
);

