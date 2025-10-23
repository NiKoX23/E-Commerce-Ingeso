import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import { CarritoProvider } from './context/CarritoContext';

import App from './App.tsx';
import Login from './rutas/Login.tsx';
import SignUp from './rutas/SignUp.tsx';
import Dashboard from './rutas/Dashboard.tsx';
import ProductoDetalle from './rutas/ProductoDetalle.tsx';
import CarritoCompra from './rutas/CarritoCompra.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/producto/:id",
    element: <ProductoDetalle />,
  },
  {
    path: "/carrito",
    element: <CarritoCompra />,
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CarritoProvider>
      <RouterProvider router={router} />
    </CarritoProvider>
  </StrictMode>
)