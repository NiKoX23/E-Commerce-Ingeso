import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../App.css';

import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useAuth } from '../Autenticacion/AuthProvider';

export default function Dashboard() {
  const { logout } = useAuth();

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
        textShadow: '1px 1px 5px rgba(0, 0, 0, 0.3)',}}>
        Dashboard - Bienvenido
      </h1>

      <Card
        header={<h3 style={{color: '#282623ff' }}>Panel de Control</h3>}
        className='card-animated card-fade'
        style={{ 
          width: '400px',
          textAlign: 'center',
          borderRadius: '12px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
          backgroundColor: '#ffffffcc'
        }}>

        <p style={{ marginBottom: '2rem', color: '#666' }}>
          Has iniciado sesión exitosamente
        </p>

        <Button 
          label="Cerrar Sesión"
          className="p-button-secondary p-button-rounded p-button-lg"
          style={{width: '100%'}}
          onClick={logout}
        />
      </Card>
    </div>
  );
}