import { useState } from "react";
import { useAuth } from "../Autenticacion/AuthProvider";
import { Navigate } from "react-router-dom";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, login } = useAuth();

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
    <div>
      <form className="form" onSubmit={handleSubmit}>  
        <h1>Iniciar Sesión</h1>
        <label>Usuario</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <label>Contraseña</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Cargando...' : 'Login'}
        </button>
      </form>
    </div>
  )
}