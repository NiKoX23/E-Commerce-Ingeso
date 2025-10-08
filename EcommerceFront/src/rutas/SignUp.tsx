import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
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
          username: name, 
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

  // Estilo consistente para todos los inputs
  const inputStyle = {
    width: '100%',
    height: '40px',
    padding: '8px 12px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box' as const
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>  
        <h1>Registrarse</h1>

        <label>Nombre</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          style={inputStyle}
          required 
        />

        <label>Correo electrónico</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          style={inputStyle}
          required 
        />

        <label>Contraseña</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          style={inputStyle}
          required 
        />
        
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>
    </div>
  )
}