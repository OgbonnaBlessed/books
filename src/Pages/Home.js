import React, { useEffect, useRef, useState } from 'react';
import products from "../Data/Data.json"
import BookSwiper from '../Components/BookSwiper';
import ProductCard from '../Components/ProductCard';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MdArrowDropDown } from 'react-icons/md'

const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [dropDown, setDropDown] = useState(false);
    const trendingProducts = products.filter(product => product.category.includes('Trending'));
    const bestSellingProducts = products.filter(product => product.category.includes('Best sellers'));
    const todayDeals = products.filter(product => product.category.includes('Deals for Today'));

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

    const categoryFadeIn = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeInOut" }
        }
    };

    const dropDownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
                setDropDown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setDropDown(!dropDown);
    }

    const selectCategory = (category) => {
        setSelectedCategory(category);
        setDropDown(false);
    };

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
        <BookSwiper /> 
            <motion.div 
                className="categories-box" ref={dropDownRef}
                initial={{
                    opacity: 0
                }}
                animate={{
                    opacity: 1,
                }}
                exit={{
                    opacity: 0,
                }}
                transition={{ 
                    duration: 1, 
                    ease: "easeInOut" 
                }} // Smooth transition
            >
                <button type="button" onClick={toggleDropdown}>
                    <p>{selectedCategory}</p>
                    <MdArrowDropDown size={20} />
                </button>
                {dropDown && (
                    <motion.div 
                        className="categories-list"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: dropDown ? 1 : 0, y: dropDown ? 0 : -10 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <ul>
                            <li onClick={() => selectCategory('All')}>All</li>
                            <li onClick={() => selectCategory('Fiction')}>Fiction</li>
                            <li onClick={() => selectCategory('Art')}>Art</li>
                            <li onClick={() => selectCategory('Business')}>Business</li>
                            <li onClick={() => selectCategory('Fantasy')}>Fantasy</li>
                            <li onClick={() => selectCategory('Children')}>Children</li>
                            <li onClick={() => selectCategory('Non-fiction')}>Non-Fiction</li>
                        </ul>
                    </motion.div>
                )}
            </motion.div>
            {selectedCategory === 'All' ? 
                <div className='content-container'>
                    <motion.div 
                        className="trending-container"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false }}
                        variants={fadeInUp}
                    >
                        <h1>Trending</h1>
                        <div className="trending-box">
                            {trendingProducts.slice(0, 3).map(product => ( 
                                <ProductCard key={product.id} item={product}/>
                            ))}
                        </div>

                        <Link to='/Trending' className='see-more'>see more</Link>
                    </motion.div>

                    <motion.div 
                        className="best-sellers-container"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false }}
                        variants={fadeInUp}
                    >
                        <h1>Best sellers</h1>
                        <div className="best-sellers-box">
                            {bestSellingProducts.slice(0, 3).map(product => ( 
                                <ProductCard key={product.id} item={product} />
                            ))}

                        </div>

                        <Link to='/Best-sellers' className='see-more'>see more</Link>
                    </motion.div>

                    <motion.div 
                        className="deals-container"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false }}
                        variants={fadeInUp}
                    >
                        <h1>Deals for Today</h1>
                        <p className='display-deals'>Displaying deals for: {formatDate(today)} - {formatDate(futureDate)}, + special offers</p>
                        <div className="deals-box">
                            {todayDeals.slice(0, 3).map(product => ( 
                                <ProductCard key={product.id} item={product}/>
                            ))}
                        </div>

                        <Link to='/Deals-for-Today' className='see-more'>see more</Link>
                    </motion.div>
                </div>
                
            :   <motion.div 
                    className='trending-main-container'
                    key={selectedCategory}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={categoryFadeIn}
                >
                    <div className="trending-container">
                        <h1>{selectedCategory}</h1>
                        <div className="trending-box trending-main-box">
                        {products.filter(product => product.category.includes(selectedCategory)).map(product => ( 
                            <ProductCard key={product.id} item={product} />
                        ))}
                        </div>
                    </div>
                </motion.div>
           }
    </>
  )
}

export default Home;