import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// PrimeReact and PrimeFlex global styles (moved here so they load for the entire app/layout)
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import { CarritoProvider } from './context/CarritoContext';

import App from './App.tsx';
import AppLayout from './layout/AppLayout';
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
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <App />
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "producto/:id",
        element: <ProductoDetalle />,
      },
      {
        path: "carrito",
        element: <CarritoCompra />,
      }
    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CarritoProvider>
      <RouterProvider router={router} />
    </CarritoProvider>
  </StrictMode>
)