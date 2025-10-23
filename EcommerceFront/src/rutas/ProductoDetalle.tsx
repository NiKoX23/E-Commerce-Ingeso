import React from 'react';
import { useCarrito } from '../context/CarritoContext';
import { useParams, useNavigate } from 'react-router-dom';

// Simulación de productos (puedes importar desde otro archivo o traer del backend)
const productos = [
  { id: 1, nombre: 'Producto 1', reseña: 4.8, descripcion: 'Descripción del producto 1', imagen: 'https://via.placeholder.com/220x220/cccccc/cccccc' },
  { id: 2, nombre: 'Producto 2', reseña: 4.7, descripcion: 'Descripción del producto 2', imagen: 'https://via.placeholder.com/220x220/cccccc/cccccc' },
  { id: 3, nombre: 'Producto 3', reseña: 4.9, descripcion: 'Descripción del producto 3', imagen: 'https://via.placeholder.com/220x220/cccccc/cccccc' },
  { id: 4, nombre: 'Producto 4', reseña: 4.6, descripcion: 'Descripción del producto 4', imagen: 'https://via.placeholder.com/220x220/cccccc/cccccc' },
  { id: 5, nombre: 'Producto 5', reseña: 4.5, descripcion: 'Descripción del producto 5', imagen: 'https://via.placeholder.com/220x220/cccccc/cccccc' },
  { id: 6, nombre: 'Producto 6', reseña: 4.9, descripcion: 'Descripción del producto 6', imagen: 'https://via.placeholder.com/220x220/cccccc/cccccc' },
  { id: 7, nombre: 'Producto 7', reseña: 4.8, descripcion: 'Descripción del producto 7', imagen: 'https://via.placeholder.com/220x220/cccccc/cccccc' },
  { id: 8, nombre: 'Producto 8', reseña: 4.7, descripcion: 'Descripción del producto 8', imagen: 'https://via.placeholder.com/220x220/cccccc/cccccc' },
  { id: 9, nombre: 'Producto 9', reseña: 4.6, descripcion: 'Descripción del producto 9', imagen: 'https://via.placeholder.com/220x220/cccccc/cccccc' },
  { id: 10, nombre: 'Producto 10', reseña: 4.9, descripcion: 'Descripción del producto 10', imagen: 'https://via.placeholder.com/220x220/cccccc/cccccc' },
  { id: 11, nombre: 'Producto 11', reseña: 3.2, descripcion: 'Descripción del producto 11', imagen: 'https://via.placeholder.com/220x220/cccccc/cccccc' },
  { id: 12, nombre: 'Producto 12', reseña: 2.9, descripcion: 'Descripción del producto 12', imagen: 'https://via.placeholder.com/220x220/cccccc/cccccc' },
  { id: 13, nombre: 'Producto 13', reseña: 3.5, descripcion: 'Descripción del producto 13', imagen: 'https://via.placeholder.com/220x220/cccccc/cccccc' },
  { id: 14, nombre: 'Producto 14', reseña: 2.7, descripcion: 'Descripción del producto 14', imagen: 'https://via.placeholder.com/220x220/cccccc/cccccc' },
  { id: 15, nombre: 'Producto 15', reseña: 3.0, descripcion: 'Descripción del producto 15', imagen: 'https://via.placeholder.com/220x220/cccccc/cccccc' },
];

const ProductoDetalle: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const producto = productos.find(p => p.id === Number(id));
  const { agregarProducto } = useCarrito();

  if (!producto) {
    return <div style={{ color: 'red', textAlign: 'center', marginTop: '3rem' }}>Producto no encontrado</div>;
  }

  return (
    <div style={{
      maxWidth: '500px',
      margin: '3rem auto',
      background: 'linear-gradient(135deg, #f7b42c 0%, #fc575e 100%)',
      borderRadius: '24px',
      boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
      padding: '2.5rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      animation: 'fadeIn 1s',
    }}>
      <img src={producto.imagen} style={{ width: '220px', height: '220px', borderRadius: '16px', marginBottom: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }} />
      <h2 style={{ color: '#fff', fontWeight: 'bold', marginBottom: '1rem' }}>{producto.nombre}</h2>
      <p style={{ color: '#ffe066', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '1rem' }}>{producto.reseña} ★</p>
      <p style={{ color: '#fff', marginBottom: '2rem', textAlign: 'center' }}>{producto.descripcion}</p>
      <button
        style={{
          background: 'linear-gradient(90deg, #00fff7 0%, #9e0505 100%)',
          color: '#fff',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '12px',
          padding: '0.8rem 2rem',
          fontSize: '1.1rem',
          cursor: 'pointer',
          marginBottom: '1.5rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
          transition: 'transform 0.1s',
        }}
        onClick={() => agregarProducto({ id: producto.id, nombre: producto.nombre, cantidad: 1 })}
      >Agregar al carrito</button>
      <button onClick={() => navigate(-1)} style={{
        background: '#fff',
        color: '#fc575e',
        fontWeight: 'bold',
        border: 'none',
        borderRadius: '12px',
        padding: '0.6rem 1.5rem',
        fontSize: '1rem',
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
        transition: 'transform 0.1s',
      }}>Volver</button>
    </div>
  );
};

export default ProductoDetalle;
