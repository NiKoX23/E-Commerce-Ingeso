import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css';

import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useNavigate } from 'react-router-dom';

function App() {
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
        textShadow: '1px 1px 5px rgba(0, 0, 0, 0.3)',}}>
        Bienvenido a Ecommerce
      </h1>

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
            <Button 
                label="Iniciar Sesión"
                className="p-button-primary p-button-rounded p-button-lg"
                style={{width: '100%'}}
                onClick={() => {
                  navigate('/login');
                }}
            />
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
            <Button 
              label="Crear Cuenta"
              className="p-button-primary p-button-rounded p-button-lg"
              style={{width: '100%'}}
              onClick={() => {
                navigate('/signup');
              }}
            />
          </p>
        </Card>

      </div>
    </div>
  );
}

export default App
