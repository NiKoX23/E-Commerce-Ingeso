import { useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";
import { Navigate, useNavigate } from "react-router-dom";
import { Message } from "primereact/message";

export default function SignUp() {
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [rut, setRut] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre || !email || !password || !confirm_password || !rut) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Ingrese un correo válido (ej: usuario@ejemplo.com).");
      return;
    }

    const rutRegex = /^\d{7,8}-[0-9Kk]$/;
    if (!rutRegex.test(rut)) {
      setError("El RUT debe tener el formato 12345678-9 o 12345678-K.");
      return;
    }

    if (!email || !password) {
      setError("Debe ingresar correo y contraseña.");
      return;
    }

    if (!email.includes("@")) {
      setError("El correo debe contener '@'.");
      return;
    }

    if (!rut.includes("-")) {
      setError("El RUT debe contener '-'.");
      return;
    }

    if (password !== confirm_password) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try{
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({rut, nombre, email, password}),
      });
      const data = await response.json();
      if(response.ok){
        alert("Usuario registrado con éxito");
        setNombre("");
        setRut("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        navigate("/dashboard");
      }else{
        alert("Error: " + data.message);
        
      }
    } catch (error) {
      console.error(error);
      alert("Error en el servidor");
    }
  }

  return (
    <div className="p-field p-col-12">
      <Button
        label="Home"
        icon="pi pi-home"
        className="p-button-text p-button-lg"
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          color: "white",
          background: "rgba(147, 14, 14, 1)",
          backdropFilter: "blur(4px)",
          borderRadius: "10px",
        }}
        onClick={() => navigate("/")}
      />

      <div 
          style={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #3a67c0, #5ab9ea)',
            padding: '2rem',
          }}
      >
            <Card 
              title="Registrarse"
              style={{
                width: '350px',
                borderRadius: '12px',
                boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                backgroundColor: '#ffffffcc',
                padding: '2rem',
                textAlign: 'center',
              }}>

              {error && (
                <Message
                  severity="error"
                  text={error}
                  style={{ marginBottom: "1rem" }}
                  />
                )}
    
              <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col-12">
                  <label htmlFor="nombre">Nombre</label>
                  <InputText 
                    id="nombre" 
                    value={nombre} 
                    onChange={(e) => setNombre(e.target.value)} 
                    placeholder="Ingrese su nombre"
                  />
                </div>

                <div className="p-field p-col-12">
                  <label htmlFor="rut">RUT</label>
                  <InputText 
                    id="rut" 
                    value={rut} 
                    onChange={(e) => setRut(e.target.value)} 
                    placeholder="RUT (EJ: 12345678-9)"
                  />
                </div>

                <div className="p-field p-col-12">
                  <label htmlFor="email">Email</label>
                  <InputText 
                    id="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="usuario@ejemplo.com"
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
                  <label htmlFor="confirm_password">Confirmar Contraseña</label>
                  <Password
                    id="confirm_password"
                    value={confirm_password} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    feedback={false}
                    placeholder="Confirme su contraseña"
                  />
                </div>
    
                <div className="p-field p-col-12">
                 <Button
                    label="SignUp"
                    className="p-button-primary p-button-rounded p-button-lg"
                    style={{width:'100%'}}
                    onClick={handleSubmit}
                  />
                </div>

              </div>
            </Card>
        </div>
    </div>
  )
}