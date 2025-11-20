import React, { useState, useEffect, useRef } from 'react';
import './SearchBar.css';

interface SearchBarProps {
  onSearch?: (termino: string) => void;
  debounceMs?: number;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, debounceMs = 400 }) => {
  const [search, setSearch] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Limpiar timeout anterior
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Si hay callback y el término no está vacío, aplicar debounce
    if (onSearch) {
      if (search.trim().length === 0) {
        // Si está vacío, llamar inmediatamente para limpiar búsqueda
        onSearch('');
      } else {
        // Aplicar debounce para términos no vacíos
        timeoutRef.current = setTimeout(() => {
          onSearch(search.trim());
        }, debounceMs);
      }
    }

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [search, onSearch, debounceMs]);

  const handleClear = () => {
    setSearch('');
    if (onSearch) {
      onSearch('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Si presiona Enter, buscar inmediatamente
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (onSearch) {
        onSearch(search.trim());
      }
    }
  };

  return (
    <div className="searchbar-container">
      <input
        type="text"
        className="searchbar-input"
        placeholder="Buscar productos..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {search.length > 0 && (
        <button
          className="searchbar-clear"
          onClick={handleClear}
          aria-label="Limpiar búsqueda"
          type="button"
        >
          ×
        </button>
      )}
      <span className="searchbar-anim"></span>
    </div>
  );
};

export default SearchBar;
