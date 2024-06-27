import React from 'react';

import './search.css';

const Search = ({setSearchQuery, searchQuery,product}) => {

  
  const handleSearch = (e) => {
    e.preventDefault();
  
    const filteredProducts = product.filter((productItem) =>
      productItem.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
  };
  
  

  return (
    <div className="SearchNavBar">
      <div className="search-container">
        <form className="search-form" onSubmit={handleSearch}>
          <div className="search-input">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">Search</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Search;
