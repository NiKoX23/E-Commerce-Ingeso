import { Link } from 'react-router-dom';
import SearchBar from '../componentes/SearchBar';
import '../componentes/SearchBar.css';
import RecommendedBar from '../componentes/RecommendedBar';
import '../componentes/RecommendedBar.css';
import AllProductsBar from '../componentes/AllProductsBar';
import '../componentes/AllProductsBar.css';
import CarritoIcono from '../componentes/CarritoIcono';
import '../componentes/CarritoIcono.css';

const categoriaBtnStyle: React.CSSProperties = {
  backgroundColor: '#00fff7',
  color: '#282623',
  fontWeight: 600,
  fontSize: '1.3rem',
  borderRadius: '12px',
  padding: '1.2rem 2.5rem',
  boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
  border: 'none',
  cursor: 'pointer',
  textDecoration: 'none',
  transition: 'transform 0.1s',
  marginBottom: '1rem',
};

export default function Dashboard() {
  return (
    <div 
      style={{
        minHeight: '100vh',
        boxSizing: 'border-box',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent: 'flex-start', 
        background: 'linear-gradient(135deg, #000000ff, #9e0505ff)',
        position: 'relative',
      }}>
      <CarritoIcono />
      <h1 style={{ 
        textAlign: 'center',
        marginBottom: '2rem',
        color: '#fff',
        textShadow: '1px 1px 5px rgba(0, 0, 0, 0.3)',
      }}>
        Catálogo de productos
      </h1>
      <SearchBar />
      <RecommendedBar />
      <AllProductsBar />
      <div
        style={{
          display: 'flex', 
          flexDirection: 'row', 
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '2rem', 
        }}>
      </div>
    </div>
  );
}