import { Outlet, Navigate } from "react-router-dom"
//import { useState} from "react"
import { useAuth } from "../Autenticacion/AuthProvider"

export default function RutaProtegida() {
  const autenticado = useAuth()

   if(autenticado.isAuthenticated) {return <Outlet />} 
    else {return <Navigate to="/" />}


}