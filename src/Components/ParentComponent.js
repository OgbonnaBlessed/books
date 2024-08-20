import React, { useState } from 'react';
import Navbar from './Navbar';
import Content from './Content';

const ParentComponent = () => {
    const [selectedCategory, setSelectedCategory] = useState('All'); // Initial category
    const [searchQuery, setSearchQuery] = useState('');
    // const [showSearchResults, setShowSearchResults] = useState(false);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        // setShowSearchResults(true); // Show search results when a search is performed
    };


    return (
        <>
            <Navbar onCategorySelect={handleCategorySelect} onSearch={handleSearch} />
            <Content selectedCategory={selectedCategory} searchQuery={searchQuery} />
        </>
    );
};

export default ParentComponent;