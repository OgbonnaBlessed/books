import React, { createContext, useState, useEffect } from 'react';

export const WishListContext = createContext();

export const WishListProvider = ({ children }) => {
    const [wishes, setWishes] = useState([]);

    useEffect(() => {
        const savedWishes = JSON.parse(localStorage.getItem('wishes')) || [];
        setWishes(savedWishes);
    }, []);

    const addToWishList = (product) => {
        const updatedWishes = [...wishes, product];
        setWishes(updatedWishes);
        localStorage.setItem('wishes', JSON.stringify(updatedWishes));
    };

    const removeFromWishList = (productId) => {
        const updatedWishes = wishes.filter((wish) => wish.id !== productId);
        setWishes(updatedWishes);
        localStorage.setItem('wishes', JSON.stringify(updatedWishes));
    };

    return (
        <WishListContext.Provider value={{ wishes, addToWishList, removeFromWishList }}>
            {children}
        </WishListContext.Provider>
    );
};