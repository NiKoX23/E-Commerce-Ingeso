import SearchBar from '../componentes/SearchBar';
import '../componentes/SearchBar.css';
import RecommendedBar from '../componentes/RecommendedBar';
import '../componentes/RecommendedBar.css';
import AllProductsBar from '../componentes/AllProductsBar';
import '../componentes/AllProductsBar.css';
import CarritoIcono from '../componentes/CarritoIcono';
import '../componentes/CarritoIcono.css';
import { Button } from 'primereact/button';
import { useSidebar } from '../context/SidebarContext';

// categoría estilo comentado (no usado)

export default function Dashboard() {
  const { open } = useSidebar();
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
  <div className="w-full flex align-items-center justify-content-between" style={{ maxWidth: 1100, marginBottom: 16 }}>
    <CarritoIcono />
  </div>
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