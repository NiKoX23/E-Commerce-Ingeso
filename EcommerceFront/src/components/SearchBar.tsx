import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Buscar productos...',
  onSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      if (onSearch) {
        onSearch(searchQuery.trim());
      } else {
        navigate(`/busqueda?q=${encodeURIComponent(searchQuery.trim())}`);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: '0.5rem',
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
      }}
    >
      <span className="p-input-icon-left" style={{ flex: 1 }}>
        <i className="pi pi-search" />
        <InputText
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          style={{ width: '100%' }}
        />
      </span>
      <Button
        label="Buscar"
        icon="pi pi-search"
        onClick={handleSearch}
        disabled={!searchQuery.trim()}
      />
    </div>
  );
};

export default SearchBar;

