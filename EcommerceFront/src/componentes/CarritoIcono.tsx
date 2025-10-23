import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CarritoIcono.css';

const CarritoIcono: React.FC = () => {
  const navigate = useNavigate();
  return (
    <button className="carrito-btn" onClick={() => navigate('/carrito')} title="Ver carrito">
      <svg width="38" height="38" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#fff" />
        <path d="M7 18c-1.104 0-2-.896-2-2s.896-2 2-2h10c1.104 0 2 .896 2 2s-.896 2-2 2H7zm0-2h10v-8H7v8zm2-6h6v2H9v-2z" fill="#fc575e" />
        <circle cx="9" cy="20" r="1.5" fill="#fc575e" />
        <circle cx="15" cy="20" r="1.5" fill="#fc575e" />
      </svg>
    </button>
  );
};

export default CarritoIcono;
