import React from 'react';
import products from '../Data/Data.json'
import Navbar from '../Components/Navbar';
import ProductCard from '../Components/ProductCard';
import { motion } from 'framer-motion';

const Deals = () => {
  const getDaySuffix = (day) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const dayWithSuffix = `${day}${getDaySuffix(day)}`;
  
    return `${date.toLocaleDateString('en-US', { month: 'short' })} ${dayWithSuffix}`;
  };

  // Calculate today's date and 5 days later
  const today = new Date();
  const futureDate = new Date();
  futureDate.setDate(today.getDate() + 5);

  return (
    <>
    <Navbar />
      <motion.div 
        className="deals-main-container"
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
        <div className="deals-container">
            <h1>Discover the best deals for today</h1>
            <p className='display-deals'>Displaying deals for: {formatDate(today)} - {formatDate(futureDate)}, + special offers</p>
            <div className="deals-box deals-main-box">
            {products.filter(product => product.category.includes('Deals for Today')).map(product => ( 
                <ProductCard key={product.id} item={product}/>
            ))}
            </div>
        </div>
      </motion.div>
    </>
  )
}

export default Deals
