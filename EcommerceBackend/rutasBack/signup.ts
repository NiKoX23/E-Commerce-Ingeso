import { Router, Request, Response } from "express";
import { pool } from "../db";
import bcrypt from "bcrypt";

const router = Router();

router.post("/", async(req: Request, res: Response) => {
  try{
    const { rut, nombre, email, password} = req.body;
    if(!rut || !nombre || !email || !password) {
      return res.status(400).json({message: "Rellene todos los campos"});
    }

    const encPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO USUARIO (rut, nombre, email, password) VALUES ($1, $2, $3, $4) RETURNING rut, nombre, email",
      [rut, nombre, email, encPassword]
    );

    res.status(201).json({message: "Usuario resgistrado con éxito", user: result.rows[0]});
  } catch (error: any) {
    res.status(500).json({message: "Error en el servidor", error});
  }

});

export default router;
