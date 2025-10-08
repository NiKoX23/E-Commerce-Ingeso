import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import Login from './rutas/Login.tsx'
import SignUp from './rutas/SignUp.tsx'
import Dashboard from './rutas/Dashboard.tsx'
import RutaProtegida from './rutas/RutaProtegida.tsx'
import AppLayout from './layout/AppLayout.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
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
        element: <RutaProtegida />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          }
        ]
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
