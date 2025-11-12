import React from 'react';
import { Producto } from '../services/productosService';
import ProductoCard from './ProductoCard';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Message } from 'primereact/message';

interface ProductoListProps {
  productos: Producto[];
  loading?: boolean;
  error?: string;
  onVerDetalle?: (producto: Producto) => void;
  onAgregarCarrito?: (producto: Producto) => void;
}

const ProductoList: React.FC<ProductoListProps> = ({
  productos,
  loading = false,
  error,
  onVerDetalle,
  onAgregarCarrito,
}) => {
  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '300px',
        }}
      >
        <ProgressSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ margin: '2rem' }}>
        <Message severity="error" text={error} />
      </div>
    );
  }

  if (productos.length === 0) {
    return (
      <div style={{ margin: '2rem', textAlign: 'center' }}>
        <Message severity="info" text="No se encontraron productos" />
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '1rem',
        padding: '2rem',
      }}
    >
      {productos.map((producto) => (
        <ProductoCard
          key={producto.id}
          producto={producto}
          onVerDetalle={onVerDetalle}
          onAgregarCarrito={onAgregarCarrito}
        />
      ))}
    </div>
  );
};

export default ProductoList;

