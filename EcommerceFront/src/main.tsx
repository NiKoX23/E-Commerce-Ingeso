import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Styles/index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Home from './paginas/Home.tsx'
import Login from './paginas/Login.tsx'
import SignUp from './paginas/SignUp.tsx'
import Dashboard from './paginas/Dashboard.tsx'
import TarjetaMaster from './paginas/TarjetaMaster.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,

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
    path: "/tarjetaMaster",
    element: <TarjetaMaster />
  }

])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)

