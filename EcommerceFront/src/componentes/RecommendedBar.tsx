import React, { useEffect, useState } from 'react';
import './RecommendedBar.css';
import { Link } from 'react-router-dom';

interface ProductoRecomendado {
  id: number;
  nombre: string;
  categoria: string;
  marca: string;
  precio: number;
  stock: number;
  reseña: number;
  descripcion: string;
  imagen: string;
}

const RecommendedBar: React.FC = () => {
  const [productosRecomendados, setProductosRecomendados] = useState<ProductoRecomendado[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/recomendados/recommended');
        
        if (!response.ok) {
          throw new Error('Error al obtener productos recomendados');
        }

        const data = await response.json();
        setProductosRecomendados(data);
        setError(null);
      } catch (err) {
        console.error('Error:', err);
        setError('No se pudieron cargar los productos recomendados');
        // Fallback si hay error
        setProductosRecomendados([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedProducts();
  }, []);

  if (loading) {
    return (
      <div className="recommendedbar-container">
        <h3 className="recommendedbar-title">Productos recomendados ⭐</h3>
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="recommendedbar-container">
        <h3 className="recommendedbar-title">Productos recomendados ⭐</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="recommendedbar-container">
      <h3 className="recommendedbar-title">Productos recomendados ⭐</h3>
      <div className="recommendedbar-list">
        {productosRecomendados.map((prod) => (
          <Link to={`/producto/${prod.id}`} className="recommendedbar-item" key={prod.id} style={{ textDecoration: 'none' }}>
            <div className="recommendedbar-img-section">
              <img src={prod.imagen} className="recommendedbar-img" />
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
