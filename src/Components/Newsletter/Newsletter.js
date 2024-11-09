import React from 'react'
import './Newsletter.css'
import { motion } from 'framer-motion';

const Newsletter = () => {
    // Define animation variants
    const fadeInUp = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                duration: 1, 
                ease: "easeInOut",
            } 
        }
    };

  return (
    <motion.div 
        className="newsletter-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        variants={fadeInUp}
    >
        <h1>Join Our Community</h1>
        <div className="newsletter-box">
            <p>Subscribe to get the latest updates on new arrivals and exclusive offers.</p>
            <form>
                <input type="email" placeholder="Enter your email" />
                <button type="button">Subscribe</button>
            </form>
        </div>
    </motion.div>
  )
}

export default Newsletter
