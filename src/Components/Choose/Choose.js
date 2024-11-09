import React from 'react';
import './Choose.css';
import { motion } from 'framer-motion';

const Choose = () => {
  // Define animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 200 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { 
            duration: 1, 
            ease: "easeInOut",
        } 
    }
  };

  return (
    <motion.div 
      className="why-choose-us-container"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }}
      variants={fadeInUp}
    >
      <h1>Why Choose Us?</h1>
      <div className='why-choose-us-box'>
        <img src={`${process.env.PUBLIC_URL}/images/testimonials/choose.jpeg`} alt="Customer Shopping" />
        <div className="why-choose-us">
          <p>Discover a world of books at unbeatable prices, with exceptional service designed to exceed your expectations.</p>
          <ul>
            <li>Vast Selection of Books Across All Genres</li>
            <li>Competitive Prices and Exclusive Offers</li>
            <li>Fast and Secure Worldwide Shipping</li>
            <li>Curated Collections Recommended by Experts</li>
            <li>Easy and Hassle-Free Returns Policy</li>
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

export default Choose;