import { Router } from "express";
import { pool } from "../db";
import { verifyToken, AuthRequest } from "./auth";

const router = Router();

router.post("/", verifyToken, async (req: AuthRequest, res) => {
  try {
    const { numero, cvv, nombre_titular, fecha_vencimiento } = req.body;
    const rut_usuario = req.user.rut;

    if (!numero || !cvv || !nombre_titular || !fecha_vencimiento) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const ultimos4 = numero.slice(-4);
    await pool.query(
      `INSERT INTO TARJETA (ultimos4, nombre_titular, fecha_vencimiento, rut_usuario)
       VALUES ($1, $2, $3, $4)`,
      [ultimos4, cvv, nombre_titular, fecha_vencimiento, rut_usuario]
    );

    res.json({ mensaje: "Tarjeta registrada correctamente" });

  } catch (err) {
    console.error("Error guardando tarjeta:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;
