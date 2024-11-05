import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(savedCart);
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]); // Save to localStorage whenever cart changes

    const handleAddToCart = (product) => {
        const existingProductIndex = cart.findIndex(item => item.id === product.id);
        if (existingProductIndex > -1) {
            const updatedCart = cart.map((item, index) =>
                index === existingProductIndex
                    ? { ...item, quantity: item.quantity + product.quantity } // Add new quantity
                    : item
            );
            setCart(updatedCart);
            
        } else {
            setCart(prevCart => [...prevCart, product]);
        }
    };

    const handleDeleteItem = (productId) => {
        const updatedCart = cart.filter(item => item.id !== productId);
        setCart(updatedCart);
    };

    const handleUpdateQuantity = (productId, newQuantity) => {
        const updatedCart = cart.map(item =>
            item.id === productId
                ? { ...item, quantity: newQuantity }
                : item
        );
        setCart(updatedCart);
    };

    return (
        <CartContext.Provider value={{ cart, handleAddToCart, handleDeleteItem, handleUpdateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};