import { useNavigate } from "react-router-dom";
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css';

import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

export default function App() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #3a67c0, #826868ff)',
      }}>

      <h1 style={{ 
        textAlign: 'center',
        marginBottom: '3rem',
        color: '#fff',
        fontSize: '3rem',
        textShadow: '2px 2px 8px rgba(0, 0, 0, 0.3)',
      }}>
        Bienvenido al E-Commerce
      </h1>

      <Card
        className='card-animated card-fade'
        style={{ 
          width: '400px',
          textAlign: 'center',
          borderRadius: '12px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
          backgroundColor: '#ffffffcc',
          padding: '2rem'
        }}>

        <h2 style={{ color: '#282623ff', marginBottom: '2rem' }}>
          ¿Qué deseas hacer?
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Button 
            label="Iniciar Sesión"
            icon="pi pi-sign-in"
            className="p-button-primary p-button-rounded p-button-lg"
            style={{ width: '100%' }}
            onClick={() => navigate('/login')}
          />

          <Button 
            label="Crear Cuenta"
            icon="pi pi-user-plus"
            className="p-button-success p-button-rounded p-button-lg"
            style={{ width: '100%' }}
            onClick={() => navigate('/signup')}
          />
        </div>
      </Card>
    </div>
  );
}