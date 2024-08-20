import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(savedCart);
    }, []);

    const handleAddToCart = (product, quantity) => {
        const existingProductIndex = cart.findIndex(item => item.id === product.id);
        if (existingProductIndex > -1) {
            const updatedCart = cart.map((item, index) =>
                index === existingProductIndex
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            );
            setCart(updatedCart);
        } else {
            setCart(prevCart => [...prevCart, { ...product, quantity }]);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    const handleDeleteItem = (productId) => {
        const updatedCart = cart.filter(item => item.id !== productId);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleUpdateQuantity = (productId, newQuantity) => {
        const updatedCart = cart.map(item =>
            item.id === productId
                ? { ...item, quantity: newQuantity }
                : item
        );
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    // const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0)

    return (
        <CartContext.Provider value={{ cart, handleAddToCart, handleDeleteItem, handleUpdateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};