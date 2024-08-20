import React, { useState, useEffect, useContext } from 'react';
import { FaHeart } from 'react-icons/fa';
import products from '../Components/Data.json'
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { WishListContext } from '../Components/WishListContext';
import { CartContext } from '../Components/CartContext';

const Deals = () => {
    const [clickedItems, setClickedItems] = useState(false);
    const { addToWishList, removeFromWishList, wishes } = useContext(WishListContext); // Use the context
    const { handleAddToCart } = useContext(CartContext);
    const [quantity, setQuantity] = useState(1)

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

    const handleAddToCartClick = (product, quantity) => {
        const productWithQuantity = ({...product, quantity}); 
        handleAddToCart(productWithQuantity); 
    }

    const handleQuantityChange = (e) => {
        setQuantity(Number(e.target.value));
    }

    const formatCurrency = (priceCents) => {
        return (Math.round(priceCents) / 100).toFixed(2);
    }

  return (
    <>
    <Navbar />
      <div className="deals-main-container">
        <div className="deals-container">
            <h1>Discover the best deals for today</h1>
            <p className='display-deals'>Displaying deals for: Aug 25 - Aug 28, + special offers</p>
            <div className="deals-box deals-main-box">
            {products.filter(product => product.category.includes('Deals for Today')).map(product => ( 
                <div key={product.id} className="deals-item">
                    <img className='product-image' src={`${process.env.PUBLIC_URL}/${product.image}`} alt="" />
                    <h3 className='title'>{product.name} by <i>{product.author}</i></h3>
                    <p>{product.description}</p>
                    <div className="rating-box">
                        <img className='product-rating-stars' src={`${process.env.PUBLIC_URL}/${product.rating.stars}`} alt="" />
                        <div className='product-rating-count'>{product.rating.count}</div>
                    </div>
                    <div className="price-box">
                        <p className='price'>${formatCurrency(product.priceCents)}</p> 
                        {product.discount && <p className='discount'>{product.discount}</p>}
                    </div>
                    <div className="product-quantity-container">
                        <select 
                            className = "quantity-selector"
                            value={quantity[product.id]} 
                            onChange={handleQuantityChange}
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </div>
                    <button onClick={() => handleAddToCartClick(product)} type="button">Add to cart</button>
                    <FaHeart
                        className='heart-icon'
                        onClick={() => handleClick(product)}
                        style={{
                            color: clickedItems[product.id] ? 'rgb(219, 21, 21)' : 'white'
                        }}
                    />
                </div>
            ))}
            </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Deals
