import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../Components/Navbar';
import { WishListContext } from '../Context/WishListContext';
import formatCurrency from '../utils/format';

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
        <>
            <Navbar />
            <div className="wish-container">
                <div className="wish-box">
                    <h1>Your Wish List</h1>
                    <div className="wish-item-container">
                        {wishes.length > 0 ? (
                            wishes.map((wish, index) => (
                                <div key={index} className="wish-item">
                                    <img className='wish-product-image' src={`${process.env.PUBLIC_URL}/${wish.image}`} alt="" />
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
            </div>
        </>
    );
};

export default WishList;
