import { Link } from 'react-router-dom';

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
      }}>
      <h1 style={{ 
        textAlign: 'center',
        marginBottom: '2rem',
        color: '#fff',
        textShadow: '1px 1px 5px rgba(0, 0, 0, 0.3)',
      }}>
        Catálogo de productos
      </h1>
      <div
        style={{
          display: 'flex', 
          flexDirection: 'row', 
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '2rem', 
        }}>
        <Link to="/futbol" style={categoriaBtnStyle}>Futbol</Link>
        <Link to="/tenis" style={categoriaBtnStyle}>Tenis</Link>
        <Link to="/basketball" style={categoriaBtnStyle}>Basketball</Link>
        <Link to="/boxeo" style={categoriaBtnStyle}>Boxeo</Link>
        <Link to="/running" style={categoriaBtnStyle}>Running</Link>
      </div>
    </div>
  );
}