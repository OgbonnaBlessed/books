import React from 'react';
import products from '../Data/Data.json'
import ProductCard from '../Components/ProductCard';
import { motion } from 'framer-motion';

const Best = () => {

  return (
    <motion.div 
      className="best-sellers-main-container"
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
      <div className="best-sellers-container">
          <h1>Explore the best sellers!</h1>
          <div className="best-sellers-box best-sellers-main-box">
          {products.filter(product => product.category.includes('Best sellers')).map(product => ( 
              <ProductCard key={product.id} item={product}/>
          ))}
          </div>
      </div>
    </motion.div>
  )
}

export default Best
