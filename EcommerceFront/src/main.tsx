import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'

import App from './App.tsx';
import Login from './rutas/Login.tsx';
import SignUp from './rutas/SignUp.tsx';
import Dashboard from './rutas/Dashboard.tsx';
import Futbol from './rutas/Futbol.tsx';
import Tenis from './rutas/Tenis.tsx';
import Basketball from './rutas/Basketball.tsx';
import Boxeo from './rutas/Boxeo.tsx';
import Running from './rutas/Running.tsx';
import Busqueda from './rutas/Busqueda.tsx';


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
    path: "/futbol",
    element: <Futbol />,
  },
  {
    path: "/tenis",
    element: <Tenis />,
  },
  {
    path: "/basketball",
    element: <Basketball />,
  },
  {
    path: "/boxeo",
    element: <Boxeo />,
  },
  {
    path: "/running",
    element: <Running />,
  },
  {
    path: "/busqueda",
    element: <Busqueda />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)