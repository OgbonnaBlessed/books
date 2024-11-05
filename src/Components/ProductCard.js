import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import formatCurrency from '../utils/format';
import { FaHeart } from 'react-icons/fa';
import { WishListContext } from '../Context/WishListContext'; 
import { CartContext } from '../Context/CartContext';

const ProductCard = ({ item }) => {
    const [clickedItems, setClickedItems] = useState(false);
    const [quantity, setQuantity] = useState(1); // Initialize quantity as 1
    const { addToWishList, removeFromWishList, wishes } = useContext(WishListContext);
    const { handleAddToCart } = useContext(CartContext);

    useEffect(() => {
        const storedClickedItems = JSON.parse(localStorage.getItem('clickedItems')) || {};
        setClickedItems(storedClickedItems);
    }, [wishes]);

    const handleClick = (product) => {
        const newClickedState = !clickedItems[product.id];

        setClickedItems((prevState) => {
            const updatedState = {
                ...prevState,
                [product.id]: newClickedState,
            };
            localStorage.setItem('clickedItems', JSON.stringify(updatedState));
            return updatedState;
        });

        if (newClickedState) {
            addToWishList(product);
        } else {
            removeFromWishList(product.id);
        }
    };

    const handleAddToCartClick = (product) => {
        const productWithQuantity = { ...product, quantity };
        handleAddToCart(productWithQuantity); 
    };

    return (
        <div key={item.id} className="trending-item">
            <Link to={`/preview/${item.id}`}>
                <img className='product-image' src={`${process.env.PUBLIC_URL}/${item.image}`} alt="" />
            </Link>
            <h3 className='title'>{item.name} by <i>{item.author}</i></h3>
            <div className="rating-box">
                <img className='product-rating-stars' src={`${process.env.PUBLIC_URL}/${item.rating.stars}`} alt="" />
                <div className='product-rating-count'>{item.rating.count}</div>
            </div>
            <div className="price">${formatCurrency(item.priceCents)}</div>
            <div className="product-quantity-container">
                <select 
                    className="quantity-selector" 
                    value={quantity} 
                    onChange={(e) => setQuantity(Number(e.target.value))}
                >
                    {[...Array(10).keys()].map(n => (
                        <option key={n + 1} value={n + 1}>{n + 1}</option>
                    ))}
                </select>
            </div>
            <button onClick={() => handleAddToCartClick(item)}>Add to Cart</button>
            <FaHeart
                className='heart-icon'
                onClick={() => handleClick(item)}
                style={{
                    color: clickedItems[item.id] ? 'rgb(219, 21, 21)' : 'white'
                }}
            />
        </div>
    );
};

export default ProductCard;