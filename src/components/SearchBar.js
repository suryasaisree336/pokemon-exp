import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm }) => (
  <input
    type="text"
    placeholder="Search Pokémon..."
    value={searchTerm}
    onChange={e => setSearchTerm(e.target.value)}
    className="search-bar"
  />
);

export default SearchBar;
