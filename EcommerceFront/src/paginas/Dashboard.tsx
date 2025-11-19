import { useState, useRef } from "react";
import { Avatar } from "primereact/avatar";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";

export default function Dashboard() {
  const email = localStorage.getItem("email") || "Invitado";
  const menu = useRef<any>(null);

  const items = [
    {
      label: "Perfil",
      icon: "pi pi-user-edit",
      command: () => alert("Abrir perfil"),
    },
    
    {
      label: "Cerrar sesión",
      icon: "pi pi-sign-out",
      command: () => {
        localStorage.removeItem("email");
        window.location.href = "/";
      },
    },
  ];

  return (
    <div style={{ position: "relative", height: "100vh", background: "#f5f5f5" }}>
      <h1 style={{ padding: "20px" }}>Bienvenido al Dashboard</h1>

      <div style={{ position: "absolute", top: "20px", right: "30px" }}>
        <Menu model={items} popup ref={menu} />
        <Button
          onClick={(e) => menu.current.toggle(e)}
          className="p-button-rounded p-button-text"
        >
          <Avatar
            label={email.charAt(0).toUpperCase()}
            shape="circle"
            style={{
              backgroundColor: "#3b82f6",
              color: "white",
              marginRight: "0.5rem",
            }}
          />
          {email}
        </Button>
      </div>
    </div>
  );
}