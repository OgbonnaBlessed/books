import React from 'react';
import products from "../Data/Data.json"
import BookSwiper from './BookSwiper';
import Footer from './Footer';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Content = ({ selectedCategory, searchQuery }) => {
    const trendingProducts = products.filter(product => product.category.includes('Trending'));
    const bestSellingProducts = products.filter(product => product.category.includes('Best sellers'));
    const todayDeals = products.filter(product => product.category.includes('Deals for Today'));

    const filteredProducts = products.filter(product => (product.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.author.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    // Define animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 100 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { 
                duration: 2, 
                ease: "easeInOut",
            } 
        }
    };

  return (
    <>
        <BookSwiper />
        {(!searchQuery) && 
            <>
            {selectedCategory === 'All' ? 
            <div className='content-container'>
            <motion.div 
                className="trending-container"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                variants={fadeInUp}
            >
                <h1>Trending</h1>
                <div className="trending-box">
                    {trendingProducts.slice(0, 3).map(product => ( 
                        <ProductCard key={product.id} item={product}/>
                    ))}
                </div>

                <Link to='/Trending' className='see-more'>see more</Link>
            </motion.div>

            <motion.div 
                className="best-sellers-container"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                variants={fadeInUp}
            >
                <h1>Best sellers</h1>
                <div className="best-sellers-box">
                    {bestSellingProducts.slice(0, 3).map(product => ( 
                        <ProductCard key={product.id} item={product} />
                    ))}

                </div>

                <Link to='/Best-sellers' className='see-more'>see more</Link>
            </motion.div>

            <motion.div 
                className="deals-container"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                variants={fadeInUp}
            >
                <h1>Deals for Today</h1>
                <p className='display-deals'>Displaying deals for: Aug 25 - Aug 28, + special offers</p>
                <div className="deals-box">
                    {todayDeals.slice(0, 3).map(product => ( 
                        <ProductCard key={product.id} item={product}/>
                    ))}
                </div>

                <Link to='/Deals-for-Today' className='see-more'>see more</Link>
            </motion.div>
            </div>
            
        : <div className='trending-main-container'>
                <div className="trending-container">
                <h1>{selectedCategory}</h1>
                <div className="trending-box trending-main-box">
                {products.filter(product => product.category.includes(selectedCategory)).map(product => ( 
                        <ProductCard key={product.id} item={product} />
                ))}
                </div>
            </div>
            </div>}
            </>
        }

        {searchQuery &&
            <div className="search-results">
                <div className="search-results-box">
                <h1>Search Results for "{searchQuery}"</h1>
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} item={product} />
                    ))}
                </div>
            </div>
        }
        <Footer/>
    </>
  )
}

export default Content;
