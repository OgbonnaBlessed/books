import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Trending from '../Pages/Trending';
import Best from '../Pages/Best';
import Deals from '../Pages/Deals';
import Preview from '../Pages/Preview';
import WishList from '../Pages/WishList';
import Search from '../Pages/Search';
import Home from '../Pages/Home';
import Contact from '../Pages/Contact';
import Checkout from '../Pages/Checkout';
import { AnimatePresence } from 'framer-motion';
import About from '../Pages/About';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/Trending" element={<Trending />} />
        <Route path="/Deals-for-Today" element={<Deals />} />
        <Route path="/Best-sellers" element={<Best />} />
        <Route path="/Preview/:productId" element={<Preview />} />
        <Route path="/search/:query" element={<Search />} />
        <Route path="/Wish-list" element={<WishList />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/About" element={<About />} />
      </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes