import React from 'react';
import products from '../Components/Data.json'
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import ProductCard from '../Components/ProductCard';

const Best = () => {

  return (
    <>
    <Navbar />
      <div className="best-sellers-main-container">
        <div className="best-sellers-container">
            <h1>Explore the best sellers!</h1>
            <div className="best-sellers-box best-sellers-main-box">
            {products.filter(product => product.category.includes('Best sellers')).map(product => ( 
                <ProductCard key={product.id} item={product}/>
            ))}
            </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Best
