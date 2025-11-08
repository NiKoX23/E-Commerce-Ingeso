import { useState } from "react";
import { Password } from 'primereact/password';
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { Message } from 'primereact/message';

export default function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Debe ingresar correo y contraseña.");
      return;
    }

       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Ingrese un correo válido (ej: usuario@ejemplo.com).");
      return;
    }

    if (!email.includes("@")) {
      setError("El correo debe contener '@'.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      } else {
        setError(data.message || "Credenciales incorrectas.");
      }
    } catch (error) {
      console.error(error);
      setError("Error en el servidor. Intente más tarde.");
    }
  };

  return (
    
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #3a67c0, #5ab9ea)",
        padding: "2rem",
      }}
    >
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

    </div>
      <Card
        title="Iniciar Sesión"
        style={{
          width: "350px",
          borderRadius: "12px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
          backgroundColor: "#ffffffcc",
          padding: "2rem",
          textAlign: "center",
        }}
      >

        {error && (
          <Message
            severity="error"
            text={error}
            style={{ marginBottom: "1rem" }}
          />
        )}

        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col-12">
            <label htmlFor="email">Correo</label>
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
            <Button
              label="Login"
              className="p-button-primary p-button-rounded p-button-lg"
              style={{ width: "100%" }}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}