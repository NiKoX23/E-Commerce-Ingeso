import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar: React.FC = () => {
  const [search, setSearch] = useState('');

  return (
    <div className="searchbar-container">
      <input
        type="text"
        className="searchbar-input"
        placeholder="Buscar productos..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <span className="searchbar-anim"></span>
    </div>
  );
};

export default SearchBar;
