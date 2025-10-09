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

export default function SignUp() {
  const [rut, setRut] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          rut,
          nombre: name, 
          password, 
          email 
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        console.log('Registro exitoso:', data);
        alert('Usuario registrado exitosamente. Ahora puedes iniciar sesión.');
        navigate('/login');
      } else {
        console.error('Error en registro:', data.error);
        alert(data.error || 'Error al registrar usuario');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      alert('Error de conexión con el servidor');
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
        background: 'linear-gradient(135deg, #000000ff, #ff0000ff)',
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
        Crear Cuenta
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
            <label htmlFor="rut" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              RUT
            </label>
            <InputText
              id="rut"
              value={rut}
              onChange={(e) => setRut(e.target.value)}
              placeholder="Ej: 12345678-9"
              style={{ width: '100%' }}
              required
            />
          </div>

          <div style={{ textAlign: 'left' }}>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Nombre
            </label>
            <InputText
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ingresa tu nombre"
              style={{ width: '100%' }}
              required
            />
          </div>

          <div style={{ textAlign: 'left' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Correo electrónico
            </label>
            <InputText
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu email"
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
            label={isLoading ? 'Registrando...' : 'Crear Cuenta'}
            className="p-button-success p-button-rounded p-button-lg"
            style={{ width: '100%', marginTop: '1rem' }}
            disabled={isLoading}
            loading={isLoading}
          />
        </form>
      </Card>
    </div>
  )
}