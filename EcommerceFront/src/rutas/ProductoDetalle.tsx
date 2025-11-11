import React, { useEffect, useState } from 'react';
import { useCarrito } from '../context/CarritoContext';
import { useParams, useNavigate } from 'react-router-dom';

interface Producto {
  id_producto: number;
  descripcion: string;
  precio: number;
  imagen: string;
  tipo: string;
  marca: string;
  stock: number;
}

const ProductoDetalle: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { agregarProducto } = useCarrito();
  const [notificacion, setNotificacion] = useState('');
  const [producto, setProducto] = useState<Producto | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/productos/${id}`);
        if (!response.ok) throw new Error('Producto no encontrado');
        const data = await response.json();
        // El API devuelve { success: true, producto: {...} }
        const productoData = data.producto || data;
        setProducto(productoData);
      } catch (error) {
        console.error('Error al cargar producto:', error);
        setProducto(null);
      } finally {
        setCargando(false);
      }
    };

    if (id) {
      fetchProducto();
    }
  }, [id]);

  if (cargando) {
    return (
      <div style={{ color: '#fff', textAlign: 'center', marginTop: '3rem' }}>
        Cargando producto...
      </div>
    );
  }

  if (!producto) {
    return (
      <div style={{ color: 'red', textAlign: 'center', marginTop: '3rem' }}>
        Producto no encontrado
      </div>
    );
  }

  const handleAgregar = () => {
    agregarProducto({
      id: producto.id_producto,
      nombre: producto.descripcion,
      precio: producto.precio,
      cantidad: 1,
      stockDisponible: producto.stock, // Pasar el stock disponible
    });
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
      <img 
        src={producto.imagen} 
        style={{ width: '220px', height: '220px', borderRadius: '16px', marginBottom: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.10)', objectFit: 'cover' }}
        onError={(e) => {
          e.currentTarget.src = `https://via.placeholder.com/220x220/${producto.tipo === 'ZAPATILLA' ? 'FF6B6B' : producto.tipo === 'CAMISETA' ? '4ECDC4' : 'FFE66D'}/ffffff?text=${encodeURIComponent(producto.descripcion.substring(0, 10))}`;
        }}
      />
      <h2 style={{ color: '#fff', fontWeight: 'bold', marginBottom: '1rem' }}>{producto.descripcion}</h2>
      <p style={{ color: '#00fff7', fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '0.5rem' }}>${producto.precio.toLocaleString()}</p>
      <p style={{ color: '#ffe066', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '1rem' }}>Marca: {producto.marca}</p>
      <p style={{ color: '#fff', marginBottom: '2rem', textAlign: 'center' }}>Stock disponible: {producto.stock} unidades</p>
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
