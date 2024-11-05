import React from 'react';
import products from "./Data.json"
import BookSwiper from './BookSwiper';
import Footer from './Footer';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';

const Content = ({ selectedCategory, searchQuery }) => {
    const trendingProducts = products.filter(product => product.category.includes('Trending'));
    const bestSellingProducts = products.filter(product => product.category.includes('Best sellers'));
    const todayDeals = products.filter(product => product.category.includes('Deals for Today'));

    const filteredProducts = products.filter(product => (product.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.author.toLowerCase().includes(searchQuery.toLowerCase()))
    );

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
                    {trendingProducts.slice(0, 8).map(product => ( 
                        <ProductCard key={product.id} item={product}/>
                    ))}

                    <Link to='/Trending' className='see-more'>see more</Link>
                </div>
            </div>

            <div className="best-sellers-container">
                <h1>Best sellers</h1>
                <div className="best-sellers-box">
                    {bestSellingProducts.slice(0, 8).map(product => ( 
                        <ProductCard key={product.id} item={product} />
                    ))}

                    <Link to='/Best-sellers' className='see-more'>see more</Link>
                </div>
            </div>

            <div className="deals-container">
                <h1>Deals for Today</h1>
                <p className='display-deals'>Displaying deals for: Aug 25 - Aug 28, + special offers</p>
                <div className="deals-box">
                    {todayDeals.slice(0, 8).map(product => ( 
                        <ProductCard key={product.id} item={product}/>
                    ))}

                    <Link to='/Deals-for-Today' className='see-more'>see more</Link>
                </div>
            </div>
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
