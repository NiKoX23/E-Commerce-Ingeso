import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Login from './rutas/Login.tsx'
import SignUp from './rutas/SignUp.tsx'
import Dashboard from './rutas/Dashboard.tsx'
import RutaProtegida from './rutas/RutaProtegida.tsx'
import { AuthProvider } from './Autenticacion/AuthProvider'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },

  {
    path: "/signup",
    element: <SignUp />,
  },


  {
    path: "/",
    element: <RutaProtegida />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],

  }

])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>  
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
