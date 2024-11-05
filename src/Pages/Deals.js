import React from 'react';
import products from '../Data/Data.json'
import Navbar from '../Components/Navbar';
import ProductCard from '../Components/ProductCard';

const Deals = () => {


  return (
    <>
    <Navbar />
      <div className="deals-main-container">
        <div className="deals-container">
            <h1>Discover the best deals for today</h1>
            <p className='display-deals'>Displaying deals for: Aug 25 - Aug 28, + special offers</p>
            <div className="deals-box deals-main-box">
            {products.filter(product => product.category.includes('Deals for Today')).map(product => ( 
                <ProductCard key={product.id} item={product}/>
            ))}
            </div>
        </div>
      </div>
    </>
  )
}

export default Deals
