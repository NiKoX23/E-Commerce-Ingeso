import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import Login from './rutas/Login.tsx'
import SignUp from './rutas/SignUp.tsx'
import { AuthProvider } from './Autenticacion/AuthProvider'

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


])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>  
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
