import React, { useContext, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import Navbar from '../Components/Navbar';
import products from "../Data/Data.json";
import { useParams } from 'react-router-dom';
import { WishListContext } from '../Context/WishListContext'; // Import the context
import { CartContext } from '../Context/CartContext';
import ProductCard from '../Components/ProductCard';
import formatCurrency from '../utils/format';

const Preview = () => {
    const [clickedItems, setClickedItems] = useState({});
    const [quantity, setQuantity] = useState(1); // Initialize quantity as 1
    const { addToWishList, removeFromWishList } = useContext(WishListContext); // Use the context
    const { handleAddToCart } = useContext(CartContext);
    const { productId } = useParams();

    const handleAddToCartClick = (product) => {
        const productWithQuantity = { ...product, quantity }; 
        handleAddToCart(productWithQuantity); 
    };

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

    // Find the specific product by ID
    const product = products.find((product) => product.id === productId);

    // If product is found, filter related products by category
    const related_products = product
        ? products.filter((item) => item.category[1] === product.category[1] && item.id !== product.id)
        : [];

        console.log(related_products);

    return (
        <>
            <Navbar />
            <div className="preview-container">
                {product && (
                    <div className="preview-item">
                        <div className="preview-images">
                            <img className="preview-image" src={`${process.env.PUBLIC_URL}/${product.image}`} alt="" />
                            <img className="preview-image" src={`${process.env.PUBLIC_URL}/${product.image}`} alt="" />
                        </div>
                        <div className='preview-product-info'>
                            <h1 className="title">{product.name}</h1>
                            <h1>{product.author}</h1>
                            <p className="preview-description">{product.description}</p>
                            <div className="preview-rating-box">
                                <img className="product-rating-stars" src={`${process.env.PUBLIC_URL}/${product.rating.stars}`} alt="" />
                                <div className="product-rating-count">{product.rating.count}</div>
                            </div>
                            <div className="preview-price">${formatCurrency(product.priceCents)}</div>
                            <div className="preview-quantity-container">
                                <select
                                    className="quantity-selector"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                >
                                    {[...Array(10).keys()].map((n) => (
                                        <option key={n + 1} value={n + 1}>{n + 1}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='product-preview-actions'>
                                <button onClick={() => handleAddToCartClick(product)}>Add to Cart</button>
                                <FaHeart
                                    className="preview-heart-icon"
                                    onClick={() => handleClick(product)}
                                    style={{
                                        color: clickedItems[product.id] ? 'rgb(219, 21, 21)' : 'white',
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Related Products Section */}
            <div className="related-products-container">
                <h1>Similar Books</h1>
                {related_products.length > 0 
                ?   <div className="trending-box trending-main-box">
                        {related_products.map((item) => (
                            <ProductCard key={item.id} item={item} />
                        ))}
                    </div>
                : <p className='no-similarity'>There's no book similar to this currently!</p>
                }
            </div>
        </>
    );
};

export default Preview;