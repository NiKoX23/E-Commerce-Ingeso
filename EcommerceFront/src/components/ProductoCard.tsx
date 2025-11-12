import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Producto } from '../services/productosService';

interface ProductoCardProps {
  producto: Producto;
  onVerDetalle?: (producto: Producto) => void;
  onAgregarCarrito?: (producto: Producto) => void;
}

const ProductoCard: React.FC<ProductoCardProps> = ({
  producto,
  onVerDetalle,
  onAgregarCarrito,
}) => {
  const header = (
    <img
      alt={producto.nombre}
      src={producto.imagen || 'https://via.placeholder.com/300x300?text=Sin+Imagen'}
      style={{
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        borderRadius: '8px 8px 0 0',
      }}
      onError={(e) => {
        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x300?text=Sin+Imagen';
      }}
    />
  );

  const footer = (
    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'space-between' }}>
      {onVerDetalle && (
        <Button
          label="Ver Detalle"
          icon="pi pi-eye"
          className="p-button-outlined"
          onClick={() => onVerDetalle(producto)}
          style={{ flex: 1 }}
        />
      )}
      {onAgregarCarrito && (
        <Button
          label="Agregar"
          icon="pi pi-shopping-cart"
          className="p-button-primary"
          onClick={() => onAgregarCarrito(producto)}
          disabled={producto.stock === 0}
          style={{ flex: 1 }}
        />
      )}
    </div>
  );

  return (
    <Card
      title={producto.nombre}
      subTitle={`$${producto.precio.toFixed(2)}`}
      header={header}
      footer={footer}
      style={{
        width: '300px',
        margin: '1rem',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        borderRadius: '8px',
      }}
    >
      <div style={{ marginBottom: '1rem' }}>
        <p
          style={{
            fontSize: '0.9rem',
            color: '#666',
            marginBottom: '0.5rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {producto.descripcion}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span
            style={{
              fontSize: '0.85rem',
              color: producto.stock > 0 ? '#28a745' : '#dc3545',
              fontWeight: 'bold',
            }}
          >
            {producto.stock > 0 ? `Stock: ${producto.stock}` : 'Sin stock'}
          </span>
          <span
            style={{
              fontSize: '0.75rem',
              color: '#999',
              textTransform: 'capitalize',
            }}
          >
            {producto.categoria}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default ProductoCard;

