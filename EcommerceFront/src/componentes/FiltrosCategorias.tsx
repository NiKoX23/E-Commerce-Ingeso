import { useState } from 'react';
import './FiltrosCategorias.css';

interface FiltrosCategoriesProps {
  onCategoriaSelect: (categoria: string) => void;
}

const FiltrosCategorias = ({ onCategoriaSelect }: FiltrosCategoriesProps) => {
  const [categoriaActiva, setCategoriaActiva] = useState<string | null>(null);

  const categorias = [
    {
      id: 'ZAPATILLA',
      nombre: 'Zapatos Deportivos',
      imagen: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
      color: '#FF6B6B',
    },
    {
      id: 'CAMISETA',
      nombre: 'Camisetas Deportivas',
      imagen: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
      color: '#4ECDC4',
    },
    {
      id: 'SHORT',
      nombre: 'Shorts Deportivos',
      imagen: 'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/cd428faafcc54b0a8ea4af4f0155af9b_9366/Shorts_de_Entrenamiento_Train_Essentials_Tejidos_Negro_IC6976_01_laydown.jpg',
      color: '#FFE66D',
    },
  ];

  const handleCategoriaClick = (categoriaId: string) => {
    if (categoriaActiva === categoriaId) {
      // Si hace clic en la activa, mostrar todos
      setCategoriaActiva(null);
      onCategoriaSelect('');
    } else {
      setCategoriaActiva(categoriaId);
      onCategoriaSelect(categoriaId);
    }
  };

  return (
    <div className="filtros-categorias-container">
      <h2 className="filtros-titulo">Busca por categoría</h2>
      <div className="filtros-grid">
        {categorias.map((categoria) => (
          <div
            key={categoria.id}
            className={`filtro-card ${categoriaActiva === categoria.id ? 'activo' : ''}`}
            onClick={() => handleCategoriaClick(categoria.id)}
            style={
              categoriaActiva === categoria.id
                ? { borderColor: categoria.color, boxShadow: `0 0 20px ${categoria.color}` }
                : {}
            }
          >
            <div className="filtro-imagen-container">
              <img
                src={categoria.imagen}
                alt={categoria.nombre}
                className="filtro-imagen"
              />
            </div>
            <h3 className="filtro-nombre">{categoria.nombre}</h3>
            {categoriaActiva === categoria.id && (
              <div className="filtro-badge">✓ Filtrado</div>
            )}
          </div>
        ))}
      </div>
      {categoriaActiva && (
        <button
          className="filtro-limpiar"
          onClick={() => {
            setCategoriaActiva(null);
            onCategoriaSelect('');
          }}
        >
          Ver todos los productos
        </button>
      )}
    </div>
  );
};

export default FiltrosCategorias;
