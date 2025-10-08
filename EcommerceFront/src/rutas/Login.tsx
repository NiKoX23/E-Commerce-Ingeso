import { useState } from "react";
import { useAuth } from "../Autenticacion/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../App.css';

import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  if(isAuthenticated) {
    return <Navigate to="/dashboard" />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(name, password);
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
        background: 'linear-gradient(135deg, #3a67c0, #826868ff)',
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
        textShadow: '1px 1px 5px rgba(0, 0, 0, 0.3)',}}>
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
              Usuario
            </label>
            <InputText
              id="username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ingresa tu usuario"
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
      </Card>
    </div>
  )
}