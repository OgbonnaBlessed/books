import React, { useState, useEffect, useContext } from 'react';
import { WishListContext } from '../Context/WishListContext';
import formatCurrency from '../utils/format';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'

const WishList = () => {
    const [wishes, setWishes] = useState([]);
    const { removeFromWishList } = useContext(WishListContext);

    useEffect(() => {
        // Load wishes from localStorage
        const savedWishes = JSON.parse(localStorage.getItem('wishes')) || [];
        setWishes(savedWishes);
    }, []);

    const handleDeleteWish = (wish) => {
        const updatedWishes = wishes.filter((w) => w.id !== wish.id);
        setWishes(updatedWishes);
        localStorage.setItem('wishes', JSON.stringify(updatedWishes));

        // Update clickedItems in localStorage
        const storedClickedItems = JSON.parse(localStorage.getItem('clickedItems')) || {};
        delete storedClickedItems[wish.id];
        localStorage.setItem('clickedItems', JSON.stringify(storedClickedItems));
    };

    return (
        <motion.div 
            className="wish-container"
            initial={{
                opacity: 0
            }}
            animate={{
                opacity: 1
            }}
            exit={{
                opacity: 0
            }}
            transition={{ 
                duration: 1, 
                ease: "easeInOut" 
            }} // Smooth transition
        >
            <div className="wish-box">
                <h1>Your Wish List</h1>
                <div className="wish-item-container">
                    {wishes.length > 0 ? (
                        wishes.map((wish, index) => (
                            <div key={index} className="wish-item">
                                <Link to={`/preview/${wish.id}`}>
                                    <img className='wish-product-image' src={`${process.env.PUBLIC_URL}/${wish.image}`} alt="" />
                                </Link>
                                <h3>{wish.name} by <i>{wish.author}</i></h3>
                                <div className="rating-box">
                                    <img className='product-rating-stars' src={`${process.env.PUBLIC_URL}/${wish.rating.stars}`} alt="" />
                                    <div className='product-rating-count'>{wish.rating.count}</div>
                                </div>
                                <div className="price-box">
                                    <p className='price'>${formatCurrency(wish.priceCents)}</p> 
                                    {wish.discount && <p className='discount'>{wish.discount}</p>}
                                </div>
                                <div className="product-quantity-container">
                                    <select className="quantity-selector">
                                        {[...Array(10).keys()].map(n => (
                                            <option key={n + 1} value={n + 1}>{n + 1}</option>
                                        ))}
                                    </select>
                                </div>
                                <button onClick={() => {
                                    removeFromWishList(wish.id);
                                    handleDeleteWish(wish);
                                }}>
                                    Remove
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="empty">
                            <p className='empty-wish-list'>Your wish list is currently empty.</p>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default WishList;
