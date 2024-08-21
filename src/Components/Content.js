import React, { useState, useEffect, useContext } from 'react';
import products from "./Data.json"
import { FaHeart } from 'react-icons/fa';
import { WishListContext } from './WishListContext'; // Import the context
import { CartContext } from './CartContext';
import BookSwiper from './BookSwiper';

const Content = ({ selectedCategory, searchQuery }) => {
    const [clickedItems, setClickedItems] = useState(false);
    const [quantity, setQuantity] = useState(1)
    const { addToWishList, removeFromWishList, wishes } = useContext(WishListContext); // Use the context
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

    const trendingProducts = products.filter(product => product.category.includes('Trending'));
    const bestSellingProducts = products.filter(product => product.category.includes('Best sellers'));
    const todayDeals = products.filter(product => product.category.includes('Deals for Today'));

    const handleAddToCartClick = (product, quantity) => {
        const productWithQuantity = ({...product, quantity}); 
        handleAddToCart(productWithQuantity); 
    }

    const handleQuantityChange = (e) => {
        setQuantity(Number(e.target.value));
    }

    const filteredProducts = products.filter(product => (product.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
           (product.author.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const formatCurrency = (priceCents) => {
        return (Math.round(priceCents) / 100).toFixed(2);
    }

  return (
    <>
    <BookSwiper />
  {(!searchQuery) && 
   <>
    {selectedCategory === 'All' ? 
    <div className='content-container'>
      <div className="trending-container">
        <h1>Trending</h1>
        <div className="trending-box">

           {trendingProducts.map(product => ( 
            <div key={product.id} className="trending-item">
                <img className='product-image' src={`${process.env.PUBLIC_URL}/${product.image}`} alt="" />
                <h3 className='title'>{product.name} by <i>{product.author}</i></h3>
                <p>{product.description}</p>
                <div className="rating-box">
                    <img className='product-rating-stars' src={`${process.env.PUBLIC_URL}/${product.rating.stars}`} alt="" />
                    <div className='product-rating-count'>{product.rating.count}</div>
                </div>
                <div className="price">${formatCurrency(product.priceCents)}</div>
                <div class="product-quantity-container">
                <select 
                    className = "quantity-selector" 
                    value={quantity[product.id]} 
                    onChange={handleQuantityChange}>
                    {[...Array(10).keys()].map(n => (
                        <option key={n + 1} value={n + 1}>{n + 1}</option>
                    ))}
                </select>
                </div>
                <button onClick={() => handleAddToCartClick(product)}>Add to Cart</button>
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

      <div className="best-sellers-container">
        <h1>Best sellers</h1>
        <div className="best-sellers-box">
        {bestSellingProducts.map(product => ( 
            <div key={product.id} className="best-sellers-item">
                <img className='product-image' src={`${process.env.PUBLIC_URL}/${product.image}`} alt="" />
                <h3 className='title'>{product.name} by <i>{product.author}</i></h3>
                <p>{product.description}</p>
                <div className="rating-box">
                    <img className='product-rating-stars' src={`${process.env.PUBLIC_URL}/${product.rating.stars}`} alt="" />
                    <div className='product-rating-count'>{product.rating.count}</div>
                </div>
                <div className="price">${formatCurrency(product.priceCents)}</div>
                <div class="product-quantity-container">
                <select 
                    className = "quantity-selector" 
                    value={quantity[product.id]} 
                    onChange={handleQuantityChange}>
                    {[...Array(10).keys()].map(n => (
                        <option key={n + 1} value={n + 1}>{n + 1}</option>
                    ))}
                </select>
                </div>
                <button onClick={() => handleAddToCartClick(product)}>Add to Cart</button>
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

      <div className="deals-container">
        <h1>Deals for Today</h1>
        <p className='display-deals'>Displaying deals for: Aug 25 - Aug 28, + special offers</p>
        <div className="deals-box">
        {todayDeals.map(product => ( 
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
                <div class="product-quantity-container">
                <select 
                    className = "quantity-selector" 
                    value={quantity[product.id]} 
                    onChange={handleQuantityChange}>
                    {[...Array(10).keys()].map(n => (
                        <option key={n + 1} value={n + 1}>{n + 1}</option>
                    ))}
                </select>
                </div>
                <button onClick={() => handleAddToCartClick(product)}>Add to Cart</button>
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
    
  : <div className='trending-main-container'>
        <div className="trending-container">
        <h1>{selectedCategory}</h1>
        <div className="trending-box trending-main-box">

           {products.filter(product => product.category.includes(selectedCategory)).map(product => ( 
            <div key={product.id} className="trending-item">
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
                <div class="product-quantity-container">
                <select 
                    className = "quantity-selector" 
                    value={quantity[product.id]} 
                    onChange={handleQuantityChange}>
                    {[...Array(10).keys()].map(n => (
                        <option key={n + 1} value={n + 1}>{n + 1}</option>
                    ))}
                </select>
                </div>
                <button onClick={() => handleAddToCartClick(product)}>Add to Cart</button>
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
    </div>}
    </>}

    {searchQuery 
    && <div className="search-results">
            <div className="search-results-box">
            <h1>Search Results for "{searchQuery}"</h1>
                {filteredProducts.map(product => (
                    <div key={product.id} className="search-item">
                        <img className='search-image' src={`${process.env.PUBLIC_URL}/${product.image}`} alt="" />
                        <h3 className='title'>{product.name} by <i>{product.author}</i></h3>
                        <p className='description'>{product.description}</p>
                        <div className="rating-box">
                            <img className='product-rating-stars' src={`${process.env.PUBLIC_URL}/${product.rating.stars}`} alt="" />
                            <div className='product-rating-count'>{product.rating.count}</div>
                        </div>
                        <div className="price-box">
                            <p className='price'>${formatCurrency(product.priceCents)}</p> 
                            {product.discount && <p className='discount'>{product.discount}</p>}
                        </div>
                        <div class="product-quantity-container">
                            <select 
                                className = "quantity-selector" 
                                value={quantity[product.id]} 
                                onChange={handleQuantityChange}>
                                {[...Array(10).keys()].map(n => (
                                <option key={n + 1} value={n + 1}>{n + 1}</option>
                                ))}
                            </select>
                        </div>
                        <button onClick={() => handleAddToCartClick(product)}>Add to Cart</button>
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
        </div>}
    </>
  )
}

export default Content;
