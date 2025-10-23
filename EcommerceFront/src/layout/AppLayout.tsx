import { Outlet } from "react-router-dom";
import { AuthProvider } from "../Autenticacion/AuthProvider";
import React from "react";
import PrimeSidebar from "../components/PrimeSidebar";
import { Button } from 'primereact/button';

export default function AppLayout() {
  const [sidebarVisible, setSidebarVisible] = React.useState(false);


return (
  <AuthProvider>
    <div className="flex">
      <PrimeSidebar visible={sidebarVisible} onHide={() => setSidebarVisible(false)} />
      <main className="flex-1">
        <header className="flex items-center justify-between p-3 border-b">
          <div className="flex items-center gap-3">
            <Button icon="pi pi-bars" className="p-button-text p-button-plain" onClick={() => setSidebarVisible(true)} aria-label="Abrir menú lateral" />
            <h1 className="text-xl font-semibold">PARGAS</h1>
          </div>
          {/* otras acciones del header */}
        </header>

        <Outlet />
      </main>
    </div>
  </AuthProvider>
);
}