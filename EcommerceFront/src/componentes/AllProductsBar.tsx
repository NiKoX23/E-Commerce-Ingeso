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
  terminoBusqueda?: string;
}

const AllProductsBar: React.FC<AllProductsBarProps> = ({ categoriaFiltrada, terminoBusqueda = '' }) => {
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

        // Prioridad: si hay búsqueda, usar endpoint de búsqueda
        // Si hay categoría pero no búsqueda, usar filtro de categoría
        // Si hay ambos, la búsqueda puede incluir filtro de categoría en el futuro
        if (terminoBusqueda && terminoBusqueda.trim().length > 0) {
          url = `http://localhost:5000/api/productos/buscar?q=${encodeURIComponent(terminoBusqueda.trim())}`;
        } else if (categoriaFiltrada) {
          url = `http://localhost:5000/api/productos/categoria/${categoriaFiltrada}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        
        // Manejar tanto si viene en 'productos' como directamente
        const productosList = data.productos || data;
        
        // Si hay búsqueda y categoría, filtrar resultados por categoría en el frontend
        let productosFiltrados = Array.isArray(productosList) ? productosList : [];
        if (terminoBusqueda && terminoBusqueda.trim().length > 0 && categoriaFiltrada) {
          productosFiltrados = productosFiltrados.filter(
            (prod: Producto) => prod.tipo === categoriaFiltrada
          );
        }
        
        setProductos(productosFiltrados);
      } catch (error) {
        console.error('Error al cargar productos:', error);
        setProductos([]);
      } finally {
        setCargando(false);
      }
    };

    fetchProductos();
  }, [categoriaFiltrada, terminoBusqueda]);

  const getTitulo = () => {
    if (terminoBusqueda && terminoBusqueda.trim().length > 0) {
      if (categoriaFiltrada) {
        return `Búsqueda: "${terminoBusqueda}" en ${categoriaFiltrada} 🛒`;
      }
      return `Búsqueda: "${terminoBusqueda}" 🛒`;
    }
    if (categoriaFiltrada) {
      return `${categoriaFiltrada} - Todos los productos 🛒`;
    }
    return 'Todos los productos 🛒';
  };

  const getMensajeVacio = () => {
    if (terminoBusqueda && terminoBusqueda.trim().length > 0) {
      if (categoriaFiltrada) {
        return `No se encontraron productos que coincidan con "${terminoBusqueda}" en ${categoriaFiltrada}`;
      }
      return `No se encontraron productos que coincidan con "${terminoBusqueda}"`;
    }
    return 'No hay productos en esta categoría';
  };

  if (cargando) {
    return (
      <div className="allproductsbar-container">
        <h3 className="allproductsbar-title">{getTitulo()}</h3>
        <div style={{ textAlign: 'center', color: '#fff', padding: '2rem' }}>
          {terminoBusqueda && terminoBusqueda.trim().length > 0 ? 'Buscando productos...' : 'Cargando productos...'}
        </div>
      </div>
    );
  }

  return (
    <div className="allproductsbar-container">
      <h3 className="allproductsbar-title">
        {getTitulo()}
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
            {getMensajeVacio()}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProductsBar;
