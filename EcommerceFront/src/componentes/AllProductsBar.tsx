import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './AllProductsBar.css';

interface Producto {
  id_producto: number;
  nombre?: string;
  descripcion: string;
  precio: number;
  imagen: string;
  tipo: string;
  marca: string;
  stock: number;
}

interface AllProductsBarProps {
  categoriaFiltrada?: string | null;
}

const AllProductsBar: React.FC<AllProductsBarProps> = ({ categoriaFiltrada }) => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);

  const getImagenFallback = (descripcion: string, tipo: string) => {
    const colores: { [key: string]: string } = {
      ZAPATILLA: 'FF6B6B',
      CAMISETA: '4ECDC4',
      SHORT: 'FFE66D',
    };
    const color = colores[tipo] || 'CCCCCC';
    return `https://via.placeholder.com/110x110/${color}/${color}?text=${encodeURIComponent(descripcion.substring(0, 10))}`;
  };

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setCargando(true);
        let url = 'http://localhost:5000/api/productos';

        if (categoriaFiltrada) {
          url = `http://localhost:5000/api/productos/categoria/${categoriaFiltrada}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        
        // Manejar tanto si viene en 'productos' como directamente
        const productosList = data.productos || data;
        setProductos(Array.isArray(productosList) ? productosList : []);
      } catch (error) {
        console.error('Error al cargar productos:', error);
        setProductos([]);
      } finally {
        setCargando(false);
      }
    };

    fetchProductos();
  }, [categoriaFiltrada]);

  if (cargando) {
    return (
      <div className="allproductsbar-container">
        <h3 className="allproductsbar-title">Todos los productos 🛒</h3>
        <div style={{ textAlign: 'center', color: '#fff', padding: '2rem' }}>
          Cargando productos...
        </div>
      </div>
    );
  }

  return (
    <div className="allproductsbar-container">
      <h3 className="allproductsbar-title">
        {categoriaFiltrada ? `${categoriaFiltrada} - ` : ''}Todos los productos 🛒
      </h3>
      <div className="allproductsbar-list">
        {productos.length > 0 ? (
          productos.map((prod) => (
            <Link 
              to={`/producto/${prod.id_producto}`} 
              className="allproductsbar-item" 
              key={prod.id_producto} 
              style={{ textDecoration: 'none' }}
            >
              <div className="allproductsbar-img-section">
                <img 
                  src={prod.imagen || getImagenFallback(prod.descripcion, prod.tipo)} 
                  className="allproductsbar-img"
                  alt={prod.descripcion}
                  onError={(e) => {
                    e.currentTarget.src = getImagenFallback(prod.descripcion, prod.tipo);
                  }}
                />
              </div>
              <span className="allproductsbar-nombre">{prod.descripcion}</span>
              <span className="allproductsbar-reseña">${prod.precio.toLocaleString()}</span>
            </Link>
          ))
        ) : (
          <div style={{ textAlign: 'center', color: '#fff', width: '100%', padding: '2rem' }}>
            No hay productos en esta categoría
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProductsBar;
