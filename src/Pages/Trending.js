import React from 'react';
import ProductCard from '../Components/ProductCard'
import products from '../Data/Data.json'
import { motion } from 'framer-motion';

const Trending = () => {

  return (
    <motion.div 
      className="trending-main-container"
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
      <div className="trending-container">
        <h1>Explore the Trending Books!</h1>
        <div className="trending-box trending-main-box">
          {products.filter(product => product.category.includes('Trending')).map(product => ( 
            <ProductCard key={product.id} item={product}/>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default Trending
