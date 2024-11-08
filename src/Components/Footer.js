import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-section">
            <h4>Book Field</h4>
            <p>BookField is your go-to destination for a wide range of books across genres. Discover, learn, and shop all in one place.</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Categories</Link></li>
              <li><Link to="/Trending">Trending</Link></li>
              <li><Link to="/Best-sellers">Best Sellers</Link></li>
              <li><Link to="/Deals-for-Today">Deals</Link></li>
              <li><Link to="/Contact">Contact Us</Link></li>
              <li><Link to="/About">About Us</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Connect with Us</h4>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2024 BookField, Inc. | A Book Group Company | All Rights Reserved.</p>
          <p>Designed and Developed by Blessed.</p>
        </div>
      </footer>
    )
}

export default Footer;