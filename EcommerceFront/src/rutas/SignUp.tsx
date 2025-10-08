import { useState } from "react";
import { useAuth } from "../Autenticacion/AuthProvider";
import { Navigate } from "react-router-dom";

export default function SignUp() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const autenticado = useAuth();

  /*if(autenticado.isAuthenticated) {
    return <Navigate to="/dashboard" />
  }*/

  return (
    <div>
      <form className="form">  
        <h1>Registrarse</h1>

        <label>Nombre</label>
        <input type="text" value ={name} onChange={(e) => setName(e.target.value)} />

        <label>Correo electrónico</label>
        <input type="text" value ={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Contraseña</label>
        <input type="password" value ={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  )
}