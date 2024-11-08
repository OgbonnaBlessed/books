import React from 'react';
import ProductCard from '../Components/ProductCard'
import products from '../Data/Data.json'
import Navbar from '../Components/Navbar';

const Trending = () => {

  return (
    <>
    <Navbar />
    <div className="trending-main-container">
      <div className="trending-container">
        <h1>Explore the Trending Books!</h1>
        <div className="trending-box trending-main-box">
          {products.filter(product => product.category.includes('Trending')).map(product => ( 
            <ProductCard key={product.id} item={product}/>
          ))}
        </div>
      </div>
    </div>
    </>
  )
}

export default Trending
