import React, { useState, useRef, useContext, useEffect } from 'react';
import { FaHeart, FaSearch, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { MdArrowDropDown } from "react-icons/md";
import { Link, NavLink } from "react-router-dom"
import { WishListContext } from './WishListContext';
import { CartContext } from './CartContext';
import products from './Data.json';

const Navbar = ({ onCategorySelect, onSearch }) => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [dropDown, setDropDown] = useState(false);
    const { wishes } = useContext(WishListContext); 
    const { cart } = useContext(CartContext);
    const [searchDropDown, setSearchDropDown] = useState(false);
    const [search, setSearch] = useState('');
    const [filteredAuthors, setFilteredAuthors] = useState([]);
    const [filteredBookNames, setFilteredBookNames] = useState([]);

    const dropDownRef = useRef(null);
    const searchRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchDropDown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleSearchList = () => {
        setSearchDropDown(true);

        // Show all authors and book names initially
        const authors = products.map(product => product.author);
        const bookNames = products.map(product => product.name);

        setFilteredAuthors(authors);
        setFilteredBookNames(bookNames);
    };

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearch(value);

        // Filter authors and book names based on the search term
        const authors = products
            .filter(product => product.author.toLowerCase().includes(value))
            .map(product => product.author);
        const bookNames = products
            .filter(product => product.name.toLowerCase().includes(value))
            .map(product => product.name);

        setFilteredAuthors(authors);
        setFilteredBookNames(bookNames);
        setSearchDropDown(true);
    };

    const selectSearch = (searchValue) => {
        setSearch(searchValue);
        setSearchDropDown(false);
    };

    const toggleDropdown = () => {
        setDropDown(!dropDown);
    }

    const selectCategory = (category) => {
        setSelectedCategory(category);
        setDropDown(false);
        onCategorySelect(category);
    };

    const handleSearchClick = () => {
        if (search.trim() !== '') {
            onSearch(search);
        }
    };

    return (
        <>
            <div className="navbar-container">
                <Link to="/" className="logo-box">
                    <img src={`${process.env.PUBLIC_URL}/icon.png`} alt="Company logo" />
                    <h2>BookField</h2>
                </Link>
                <FaBars className='show-sidebar' />

                <div className="right-side-content">
                    <FaTimes className='close-sidebar' />
                    <nav>
                        <NavLink to="/Trending">Trending</NavLink>
                        <NavLink to="/Deals-for-Today">Deals for today</NavLink>
                        <NavLink to="/Best-sellers">Best sellers</NavLink>
                    </nav>
                    <div className="categories-box">
                        <button type="button" onClick={toggleDropdown}>
                            <p>{selectedCategory}</p>
                            <MdArrowDropDown size={20} />
                        </button>
                        {dropDown && (
                            <div className="categories-list" ref={dropDownRef}>
                                <ul>
                                    <li onClick={() => selectCategory('All')}>All</li>
                                    <li onClick={() => selectCategory('Fiction')}>Fiction</li>
                                    <li onClick={() => selectCategory('Art')}>Art</li>
                                    <li onClick={() => selectCategory('Business')}>Business</li>
                                    <li onClick={() => selectCategory('Fantasy')}>Fantasy</li>
                                    <li onClick={() => selectCategory('Children')}>Children</li>
                                    <li onClick={() => selectCategory('Non-fiction')}>Non-Fiction</li>
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className="search-box">
                        <input 
                            type="text" 
                            placeholder='Search' 
                            value={search}
                            onFocus={toggleSearchList}
                            onChange={handleSearch}
                        />
                        <span>
                            <FaSearch 
                                className='search-icon' 
                                size={15} 
                                onClick={handleSearchClick}
                            />
                        </span>
                        {searchDropDown && 
                        <div className="search-list" ref={searchRef}>
                            <ul>
                                {/* If no authors or books are found, show 'No search found' */}
                                {filteredAuthors.length === 0 && filteredBookNames.length === 0 ? (
                                    <li className='no-search-found'>No search found</li>
                                ) : (
                                    <>
                                        {/* List book names */}
                                        {filteredBookNames.map((name, index) => (
                                            <li key={index} onClick={() => selectSearch(name)}>
                                                {name}
                                            </li>
                                        ))}
                                        {/* List authors */}
                                        {filteredAuthors.map((author, index) => (
                                            <li key={index} onClick={() => selectSearch(author)}>
                                                {author}
                                            </li>
                                        ))}
                                    </>
                                )}
                            </ul>
                        </div>}
                    </div>
                    <Link to="/Checkout" className="shopping-cart">
                        <FaShoppingCart className='cart' size={30} />
                        <span className="number-of-items">{cart.length}</span>
                    </Link>
                    <Link to='/Wish-list' className="favorite-box">
                        <FaHeart className='wish' color='rgb(219, 21, 21)' size={30} />
                        <span className='number-of-wish-items'>{wishes.length}</span>
                    </Link>
                    <div className="sign-up-box">
                        <button type='button' className='sign-up'> sign up</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar