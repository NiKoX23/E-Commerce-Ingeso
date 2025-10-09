import { Router, Request, Response } from "express";
import { pool } from "../db";
import bcrypt from "bcrypt";

const router = Router();

router.post("/", async(req: Request, res: Response) => {
  try{
    const { rut, nombre, email, password} = req.body;
    
    if(!rut || !nombre || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Rellene todos los campos"
      });
    }

    // Verificar si el usuario ya existe
    const existingUser = await pool.query(
      "SELECT rut FROM USUARIO WHERE rut = $1 OR email = $2 OR nombre = $3",
      [rut, email, nombre]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "El usuario, email o RUT ya existe"
      });
    }

    const encPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO USUARIO (rut, nombre, email, password) VALUES ($1, $2, $3, $4) RETURNING rut, nombre, email",
      [rut, nombre, email, encPassword]
    );

    res.status(201).json({
      success: true,
      message: "Usuario registrado con éxito", 
      user: result.rows[0]
    });
  } catch (error: any) {
    console.error('Error en signup:', error);
    res.status(500).json({
      success: false,
      message: "Error en el servidor", 
      error: error.message
    });
  }
});

export default router;