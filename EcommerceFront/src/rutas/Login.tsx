import { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../App.css';

import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { useAuth } from '../Autenticacion/AuthProvider';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(username, password);
    } catch (error) {
      console.error('Error en login:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #000000ff, #ff0a0aff)',
      }}>

      <Button 
        icon="pi pi-arrow-left"
        label="Volver"
        className="p-button-text p-button-lg"
        style={{ 
          position: 'absolute',
          top: '2rem',
          left: '2rem',
          color: '#fff'
        }}
        onClick={() => navigate('/')}
      />

      <h1 style={{ 
        textAlign: 'center',
        marginBottom: '3rem',
        color: '#fff',
        textShadow: '1px 1px 5px rgba(0, 0, 0, 0.3)',
      }}>
        Iniciar Sesión
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

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ textAlign: 'left' }}>
            <label htmlFor="username" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Usuario o Email
            </label>
            <InputText
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingresa tu usuario o email"
              style={{ width: '100%' }}
              required
            />
          </div>

          <div style={{ textAlign: 'left' }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Contraseña
            </label>
            <Password
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              style={{ width: '100%' }}
              inputStyle={{ width: '100%' }}
              feedback={false}
              toggleMask
              required
            />
          </div>

          <Button 
            type="submit"
            label={isLoading ? 'Iniciando...' : 'Iniciar Sesión'}
            className="p-button-primary p-button-rounded p-button-lg"
            style={{ width: '100%', marginTop: '1rem' }}
            disabled={isLoading}
            loading={isLoading}
          />
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <p style={{ color: '#666' }}>¿No tienes cuenta?</p>
          <Button 
            label="Crear Cuenta"
            className="p-button-text"
            onClick={() => navigate('/signup')}
          />
        </div>
      </Card>
    </div>
  );
}