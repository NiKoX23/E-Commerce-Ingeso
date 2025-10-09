import { useState } from "react";
import { Password } from 'primereact/password';
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navegate = useNavigate();

  const handleSubmit= async (e: React.FormEvent) => {
    e.preventDefault();

    try{
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password}),
      });

      const data = await response.json();

      if(response.ok){
        alert("Acceso correcto");
        localStorage.setItem("user",JSON.stringify(data.user));
        navegate("/dashboard");
      }else{
        alert("Error: " + data.message);
      }

    }catch (error) {
      console.error(error);
      alert("Error en el servidor");
    }
  
  }
  return (
    <div 
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #3a67c0, #5ab9ea)',
        padding: '2rem',
      }}>
        <Card 
          title="Iniciar Sesión"
          style={{
            width: '350px',
            borderRadius: '12px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
            backgroundColor: '#ffffffcc',
            padding: '2rem',
            textAlign: 'center',
          }}>

          <div className="p-fluid p-formgrid p-grid">
            <div className="p-field p-col-12">
              <label htmlFor="email">Correo</label>
              <InputText 
                id="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Ingrese su correo"
              />
            </div>

            <div className="p-field p-col-12">
              <label htmlFor="password">Contraseña</label>
              <Password
                id="password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                feedback={false}
                placeholder="Ingrese su contraseña"
              />
            </div>

            <div className="p-field p-col-12">
             <Button
                label="Login"
                className="p-button-primary p-button-rounded p-button-lg"
                style={{width:'100%'}}
                onClick={handleSubmit}
              />
            </div>
          </div>
        </Card>
    </div>
  );
}