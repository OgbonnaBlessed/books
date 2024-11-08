import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WishListProvider } from './Context/WishListContext';
import { CartProvider } from './Context/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <WishListProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </WishListProvider>
);