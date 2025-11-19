import { Router, Request, Response } from "express";
import { pool } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();
const SECRET = process.env.JWT_SECRET!;

router.post("/", async(req: Request, res: Response) => {
  try {
    const { rut, nombre, email, password} = req.body;
    if(!rut || !nombre || !email || !password) {
      return res.status(400).json({message: "Rellene todos los campos"});
    }

    const encPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO USUARIO (rut, nombre, email, password) VALUES ($1, $2, $3, $4) RETURNING rut, nombre, email",
      [rut, nombre, email, encPassword]
    );

    const user = result.rows[0];
    const token = jwt.sign(
      {
        rut: user.rut,
        nombre: user.nombre,
        email: user.email
      },
      SECRET,
      { expiresIn: "2h" }
    );

    res.status(201).json({
      message: "Usuario registrado con éxito",
      token,
      user
    });

  } catch (error: any) {
    res.status(500).json({message: "Error en el servidor", error});
  }

});

export default router;
