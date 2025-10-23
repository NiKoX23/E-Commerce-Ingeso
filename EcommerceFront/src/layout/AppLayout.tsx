import { Outlet } from "react-router-dom";
import { AuthProvider } from "../Autenticacion/AuthProvider";
import PrimeSidebar from "../componentes/PrimeSidebar";
import { Button } from 'primereact/button';
import { SidebarProvider, useSidebar } from '../context/SidebarContext';

function AppLayoutContent() {
  const { visible, open, close } = useSidebar();

  return (
    <div className="flex surface-ground min-h-screen">
      <PrimeSidebar visible={visible} onHide={close} />

      <main className="flex-1 flex flex-column min-h-screen">
        <header className="flex align-items-center justify-content-between p-3 border-bottom surface-card">
          <div className="flex align-items-center gap-3">
            <Button icon="pi pi-bars" className="p-button-text p-button-plain" onClick={open} aria-label="Abrir menú lateral" />
            <h1 className="text-xl font-semibold">PARGAS</h1>
          </div>
          {/* otras acciones del header */}
        </header>

        <div className="p-4 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default function AppLayout() {
  return (
    <AuthProvider>
      <SidebarProvider>
        <AppLayoutContent />
      </SidebarProvider>
    </AuthProvider>
  );
}