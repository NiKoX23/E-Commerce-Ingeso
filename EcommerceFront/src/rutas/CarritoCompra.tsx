import React from 'react';
import './CarritoCompra.css';

import { useNavigate } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';

const CarritoCompra: React.FC = () => {
  const navigate = useNavigate();
  const { productos, limpiarCarrito } = useCarrito();

  return (
    <div className="carrito-compra-container">
      <h2 className="carrito-compra-title">Mi carrito 🛒</h2>
      <div className="carrito-compra-list">
        {productos.length === 0 ? (
          <p className="carrito-compra-vacio">Tu carrito está vacío</p>
        ) : (
          productos.map((prod: { id: number; nombre: string; cantidad: number }) => (
            <div className="carrito-compra-item" key={prod.id}>
              <span className="carrito-compra-nombre">{prod.nombre}</span>
              <span className="carrito-compra-cantidad">x{prod.cantidad}</span>
            </div>
          ))
        )}
      </div>
  <button className="carrito-compra-limpiar" onClick={limpiarCarrito}>Limpiar carrito</button>
  <button className="carrito-compra-volver" onClick={() => navigate(-1)}>Volver</button>
    </div>
  );
};

export default CarritoCompra;
