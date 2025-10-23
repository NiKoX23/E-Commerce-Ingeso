import React from 'react';
import { Link } from 'react-router-dom';
import './AllProductsBar.css';

// Simulación de todos los productos con imagen
const productos = [
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
  { id: 11, nombre: 'Producto 11', reseña: 3.2, imagen: 'https://via.placeholder.com/110x110/cccccc/cccccc' },
  { id: 12, nombre: 'Producto 12', reseña: 2.9, imagen: 'https://via.placeholder.com/110x110/cccccc/cccccc' },
  { id: 13, nombre: 'Producto 13', reseña: 3.5, imagen: 'https://via.placeholder.com/110x110/cccccc/cccccc' },
  { id: 14, nombre: 'Producto 14', reseña: 2.7, imagen: 'https://via.placeholder.com/110x110/cccccc/cccccc' },
  { id: 15, nombre: 'Producto 15', reseña: 3.0, imagen: 'https://via.placeholder.com/110x110/cccccc/cccccc' },
];

const AllProductsBar: React.FC = () => {
  return (
    <div className="allproductsbar-container">
      <h3 className="allproductsbar-title">Todos los productos 🛒</h3>
      <div className="allproductsbar-list">
        {productos.map((prod) => (
          <Link to={`/producto/${prod.id}`} className="allproductsbar-item" key={prod.id} style={{ textDecoration: 'none' }}>
            <div className="allproductsbar-img-section">
              <img src={prod.imagen} className="allproductsbar-img" />
            </div>
            <span className="allproductsbar-nombre">{prod.nombre}</span>
            <span className="allproductsbar-reseña">{prod.reseña} ★</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllProductsBar;
