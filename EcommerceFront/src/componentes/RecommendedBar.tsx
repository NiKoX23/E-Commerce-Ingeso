import React from 'react';
import './RecommendedBar.css';

import { Link } from 'react-router-dom';
// Simulación de productos recomendados con imagen
const productosRecomendados = [
  { id: 1, nombre: 'Producto 1', reseña: 4.8, imagen: 'https://via.placeholder.com/110x110/cccccc/cccccc' },
  { id: 2, nombre: 'Producto 2', reseña: 4.7, imagen: 'https://via.placeholder.com/110x110/cccccc/cccccc' },
  { id: 3, nombre: 'Producto 3', reseña: 4.9, imagen: 'https://via.placeholder.com/110x110/cccccc/cccccc' },
  { id: 4, nombre: 'Producto 4', reseña: 4.6, imagen: 'https://via.placeholder.com/110x110/cccccc/cccccc' },
  { id: 5, nombre: 'Producto 5', reseña: 4.5, imagen: 'https://via.placeholder.com/110x110/cccccc/cccccc' },
  { id: 6, nombre: 'Producto 6', reseña: 4.9, imagen: 'https://via.placeholder.com/110x110/cccccc/cccccc' },
  { id: 7, nombre: 'Producto 7', reseña: 4.8, imagen: 'https://via.placeholder.com/110x110/cccccc/cccccc' },
  { id: 8, nombre: 'Producto 8', reseña: 4.7, imagen: 'https://via.placeholder.com/110x110/cccccc/cccccc' },
  { id: 9, nombre: 'Producto 9', reseña: 4.6, imagen: 'https://via.placeholder.com/110x110/cccccc/cccccc' },
  { id: 10, nombre: 'Producto 10', reseña: 4.9, imagen: 'https://via.placeholder.com/110x110/cccccc/cccccc' },
];

const RecommendedBar: React.FC = () => {
  return (
    <div className="recommendedbar-container">
      <h3 className="recommendedbar-title">Productos recomendados ⭐</h3>
      <div className="recommendedbar-list">
        {productosRecomendados.map((prod) => (
          <Link to={`/producto/${prod.id}`} className="recommendedbar-item" key={prod.id} style={{ textDecoration: 'none' }}>
            <div className="recommendedbar-img-section">
              <img src={prod.imagen} alt={prod.nombre} className="recommendedbar-img" />
            </div>
            <span className="recommendedbar-nombre">{prod.nombre}</span>
            <span className="recommendedbar-reseña">{prod.reseña} ★</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecommendedBar;
