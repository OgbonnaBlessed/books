import React, { useContext, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import products from "../Data/Data.json";
import { Link, useParams } from 'react-router-dom';
import { WishListContext } from '../Context/WishListContext'; // Import the context
import { CartContext } from '../Context/CartContext';
import ProductCard from '../Components/ProductCard';
import formatCurrency from '../utils/format';
import { ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion';

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

    return (
        <>
            {product && (
                <motion.div 
                    className="preview-container"
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
                    <div className='bread-crumb'>
                        <Link to='/'>Home</Link>
                        <ChevronRight className='right-icon'/>
                        <div>{product.category[0]}</div>
                        <ChevronRight className='right-icon'/>
                        <div>{product.name}</div>
                    </div>
                    <div className="preview-item">
                        <div className="preview-images">
                            <img className="preview-image" src={`${process.env.PUBLIC_URL}/${product.image}`} alt="" />
                            <img className="preview-image" src={`${process.env.PUBLIC_URL}/${product.image}`} alt="" />
                        </div>
                        <div className='preview-product-info'>
                            <h1>{product.name}</h1>
                            <h1 className="title">{product.author}</h1>
                            <p className="preview-description">{product.description}</p>
                            <div className='preview-categories'>
                                {product.category.map((category, i) => (
                                    <div key={i}>{category}</div>
                                ))}
                            </div>
                            <div className="preview-rating-box">
                                <img className="product-rating-stars" src={`${process.env.PUBLIC_URL}/${product.rating.stars}`} alt="" />
                                <div className="product-rating-count">{product.rating.count}</div>
                            </div>
                            <div className="preview-price">
                                ${formatCurrency(product.priceCents)}
                                {product.discount && <div className='preview-discount'>{product.discount && product.discount}</div>}
                            </div>
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
                </motion.div>
            )}

            {/* Related Products Section */}
            <motion.div 
                className="related-products-container"
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
                <h1>Similar Books</h1>
                {related_products.length > 0 
                ?   <div className="trending-box trending-main-box">
                        {related_products.map((item) => (
                            <ProductCard key={item.id} item={item} />
                        ))}
                    </div>
                : <p className='no-similarity'>There's no book similar to this currently!</p>
                }
            </motion.div>
        </>
    );
};

export default Preview;