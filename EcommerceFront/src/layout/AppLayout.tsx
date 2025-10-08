import { Outlet } from "react-router-dom";
import { AuthProvider } from "../Autenticacion/AuthProvider";

export default function AppLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}