import React from 'react';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Link } from 'react-router-dom';

const categoriaBtnStyle = {
  backgroundColor: '#00fff7',
  color: '#282623',
  fontWeight: 600,
  fontSize: '1.3rem',
  borderRadius: '12px',
  padding: '1.2rem 2.5rem',
  boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
  border: 'none',
  cursor: 'pointer',
  transition: 'transform 0.1s',
};

function App() {
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
        textShadow: '1px 1px 5px rgba(0, 0, 0, 0.3)',}}>
        Bienvenido a PARGAS-Ecommerce
      </h1>
      <h2 style={{
        textAlign: 'center',
        marginBottom: '2rem',
        color: '#fff',
        fontWeight: 600,
      }}>
        Catalogo de productos
      </h2>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '2rem',
        marginBottom: '3rem',
      }}>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '2rem',
        }}>
        {/*LogIn */}
        <Card
          header={<h3 style={{color: '#282623ff' }}>¿Ya estás registrado?</h3>}
          className='card-animated card-fade'
          style={{ 
            width: '300px',
            textAlign: 'center',
            borderRadius: '12px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
            backgroundColor: '#ffffffcc'
          }}>
          <p>
            <Link to="/login" style={{
              display: 'inline-block',
              width: '100%',
              padding: '1rem 0',
              background: '#007ad9',
              color: '#fff',
              borderRadius: '8px',
              textAlign: 'center',
              fontWeight: 600,
              textDecoration: 'none',
              fontSize: '1.1rem',
              marginTop: '0.5rem',
            }}>
              Iniciar Sesión
            </Link>
          </p>
        </Card>
        {/*SignUp */}
        <Card
          header={<h3 style={{color: '#282623ff' }}>¿Aún no tienes cuenta?</h3>}
          className='card-animated card-fade'
          style={{ 
            width: '300px',
            textAlign: 'center',
            borderRadius: '12px',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
            backgroundColor: '#ffffffcc'
          }}>
          <p>
            <Link to="/signup" style={{
              display: 'inline-block',
              width: '100%',
              padding: '1rem 0',
              background: '#00c49a',
              color: '#fff',
              borderRadius: '8px',
              textAlign: 'center',
              fontWeight: 600,
              textDecoration: 'none',
              fontSize: '1.1rem',
              marginTop: '0.5rem',
            }}>
              Crear Cuenta
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}

export default App;