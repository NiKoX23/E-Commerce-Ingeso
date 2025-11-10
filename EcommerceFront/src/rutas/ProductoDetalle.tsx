import React from 'react';
import { useCarrito } from '../context/CarritoContext';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

// Simulación de productos (puedes importar desde otro archivo o traer del backend)
const productos = [
  { id: 1, nombre: 'Producto 1', precio: 29.99, reseña: 4.8, descripcion: 'Descripción del producto 1', imagen: 'https://via.placeholder.com/220x220/cccccc/cccccc' },
  { id: 2, nombre: 'Producto 2', precio: 39.99, reseña: 4.7, descripcion: 'Descripción del producto 2', imagen: 'https://via.placeholder.com/220x220/cccccc/cccccc' },
  { id: 3, nombre: 'Producto 3', precio: 49.99, reseña: 4.9, descripcion: 'Descripción del producto 3', imagen: 'https://via.placeholder.com/220x220/cccccc/cccccc' },
  { id: 4, nombre: 'Producto 4', precio: 24.99, reseña: 4.6, descripcion: 'Descripción del producto 4', imagen: 'https://via.placeholder.com/220x220/cccccc/cccccc' },
  { id: 5, nombre: 'Producto 5', precio: 34.99, reseña: 4.5, descripcion: 'Descripción del producto 5', imagen: 'https://via.placeholder.com/220x220/cccccc/cccccc' },
  { id: 6, nombre: 'Producto 6', precio: 44.99, reseña: 4.9, descripcion: 'Descripción del producto 6', imagen: 'https://via.placeholder.com/220x220/cccccc/cccccc' },
  { id: 7, nombre: 'Producto 7', precio: 54.99, reseña: 4.8, descripcion: 'Descripción del producto 7', imagen: 'https://via.placeholder.com/220x220/cccccc/cccccc' },
  { id: 8, nombre: 'Producto 8', precio: 59.99, reseña: 4.7, descripcion: 'Descripción del producto 8', imagen: 'https://via.placeholder.com/220x220/cccccc/cccccc' },
  { id: 9, nombre: 'Producto 9', precio: 19.99, reseña: 4.6, descripcion: 'Descripción del producto 9', imagen: 'https://via.placeholder.com/220x220/cccccc/cccccc' },
  { id: 10, nombre: 'Producto 10', precio: 89.99, reseña: 4.9, descripcion: 'Descripción del producto 10', imagen: 'https://via.placeholder.com/220x220/cccccc/cccccc' },
  { id: 11, nombre: 'Producto 11', precio: 15.99, reseña: 3.2, descripcion: 'Descripción del producto 11', imagen: 'https://via.placeholder.com/220x220/cccccc/cccccc' },
  { id: 12, nombre: 'Producto 12', precio: 22.99, reseña: 2.9, descripcion: 'Descripción del producto 12', imagen: 'https://via.placeholder.com/220x220/cccccc/cccccc' },
  { id: 13, nombre: 'Producto 13', precio: 35.99, reseña: 3.5, descripcion: 'Descripción del producto 13', imagen: 'https://via.placeholder.com/220x220/cccccc/cccccc' },
  { id: 14, nombre: 'Producto 14', precio: 18.99, reseña: 2.7, descripcion: 'Descripción del producto 14', imagen: 'https://via.placeholder.com/220x220/cccccc/cccccc' },
  { id: 15, nombre: 'Producto 15', precio: 42.99, reseña: 3.0, descripcion: 'Descripción del producto 15', imagen: 'https://via.placeholder.com/220x220/cccccc/cccccc' },
];


const ProductoDetalle: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const producto = productos.find(p => p.id === Number(id));
  const { agregarProducto } = useCarrito();
  const [notificacion, setNotificacion] = useState('');

  if (!producto) {
    return <div style={{ color: 'red', textAlign: 'center', marginTop: '3rem' }}>Producto no encontrado</div>;
  }

  const handleAgregar = () => {
    agregarProducto({ id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: 1 });
    setNotificacion('Producto agregado exitosamente al carrito');
    setTimeout(() => setNotificacion(''), 2000);
  };

  return (
    <div style={{
      width: '800px',
      height: '800px',
      margin: '3rem auto',
      background: 'linear-gradient(135deg, #f7b42c 0%, #fc575e 100%)',
      borderRadius: '24px',
      boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
      padding: '2.5rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      animation: 'fadeIn 1s',
      position: 'relative',
      boxSizing: 'border-box',
    }}>
      {notificacion && (
        <div style={{
          position: 'absolute',
          top: '-2.2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#fff',
          color: '#fc575e',
          padding: '0.7rem 1.5rem',
          borderRadius: '10px',
          fontWeight: 'bold',
          boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
          zIndex: 10,
        }}>{notificacion}</div>
      )}
      <img src={producto.imagen} style={{ width: '220px', height: '220px', borderRadius: '16px', marginBottom: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }} />
      <h2 style={{ color: '#fff', fontWeight: 'bold', marginBottom: '1rem' }}>{producto.nombre}</h2>
      <p style={{ color: '#00fff7', fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '0.5rem' }}>${producto.precio.toFixed(2)}</p>
      <p style={{ color: '#ffe066', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '1rem' }}>{producto.reseña} ★</p>
      <p style={{ color: '#fff', marginBottom: '2rem', textAlign: 'center' }}>{producto.descripcion}</p>
      <div style={{
        position: 'absolute',
        bottom: '2.5rem',
        left: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        gap: '1.5rem',
      }}>
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
            boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
            transition: 'transform 0.1s',
          }}
          onClick={handleAgregar}
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
    </div>
  );
};

export default ProductoDetalle;
