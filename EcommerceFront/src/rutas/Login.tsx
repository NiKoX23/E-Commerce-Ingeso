import DefaultLayout from "../Layouts/DefaultLayout";
import { useState } from "react";
import { useAuth } from "../Autenticacion/AuthProvider";
import { Navigate } from "react-router-dom";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const autenticado = useAuth();

  if(autenticado.isAuthenticated) {
    return <Navigate to="/dashboard" />
  }

  return (
    <DefaultLayout>
      <form className="form">  
        <h1>Iniciar Sesión</h1>
        <label>Usuario</label>
        <input type="text" value ={name} onChange={(e) => setName(e.target.value)} />
        <label>Contraseña</label>
        <input type="password" value ={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </DefaultLayout>
  )
}