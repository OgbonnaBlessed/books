import React, { useState, useRef, useContext, useEffect } from 'react';
import { FaHeart, FaSearch, FaShoppingCart } from 'react-icons/fa';
import { Link, NavLink } from "react-router-dom"
import { WishListContext } from '../Context/WishListContext';
import { CartContext } from '../Context/CartContext';
import products from '../Data/Data.json';
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { wishes } = useContext(WishListContext); 
    const { cart } = useContext(CartContext);
    const [searchDropDown, setSearchDropDown] = useState(false);
    const [search, setSearch] = useState('');
    const [filteredAuthors, setFilteredAuthors] = useState([]);
    const [filteredBookNames, setFilteredBookNames] = useState([]);
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen(!open);
    }

    const searchRef = useRef(null);
    const sidebarRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (sidebarRef.current && !sidebarRef.current.contains(event.target) && !event.target.classList.contains('show-sidebar')) {
            setOpen(false);
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

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

    const navigate = useNavigate();

    const handleSearchClick = () => {
        if (search.trim() !== '') {
            navigate(`/search/${search.trim()}`);
        }
    };

    return (
        <>
            <div className="navbar-container">
                <Link to="/" className="logo-box">
                    <img src={`${process.env.PUBLIC_URL}/icon.png`} alt="Company logo" />
                    <h2>BookField</h2>
                </Link>
                <BsThreeDotsVertical className='show-sidebar' onClick={toggleOpen} />

                <div className={`right-side-content ${open ? 'show' : 'none'}`} ref={sidebarRef}>
                    <nav>
                        <NavLink to="/Trending">Trending</NavLink>
                        <NavLink to="/Deals-for-Today">Deals for today</NavLink>
                        <NavLink to="/Best-sellers">Best sellers</NavLink>
                    </nav>
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
                        <button type='button' className='sign-up'> Sign up</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar