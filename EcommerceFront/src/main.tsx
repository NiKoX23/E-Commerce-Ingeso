import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// PrimeReact styles (tema ejemplo: saga-blue), core y icons
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
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
import AppLayout from './layout/AppLayout';


const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <App /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <SignUp /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'futbol', element: <Futbol /> },
      { path: 'tenis', element: <Tenis /> },
      { path: 'basketball', element: <Basketball /> },
      { path: 'boxeo', element: <Boxeo /> },
      { path: 'running', element: <Running /> }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)