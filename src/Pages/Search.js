import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import products from '../Data/Data.json';
import ProductCard from '../Components/ProductCard';

const Search = () => {
  const { query } = useParams(); // Get search query from URL parameters
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const searchTerm = query.toLowerCase();
    const results = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.author.toLowerCase().includes(searchTerm)
    );
    setFilteredProducts(results);
  }, [query]);

  return (
    <div className="trending-main-container">
        <div className="trending-container">
            <h1>Search Results for "{query}"</h1>
            {filteredProducts.length > 0 ? (
                <div className="trending-box trending-main-box">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} item={product} />
                    ))}
                </div>
                ) : (
                    <p className='no-products-found'>No products found for "{query}"</p>
                )}
        </div>
    </div>
  );
};

export default Search;