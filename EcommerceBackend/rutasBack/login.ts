import { Router, Request, Response } from 'express';
import { pool } from '../db';
import bcrypt from 'bcrypt';

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try{
    const {email, password} = req.body;
    if(!email || !password) {
      return res.status(400).json({message: "Debe rellenar todos los campos"});
    }

    const result = await pool.query(
      "SELECT rut,nombre,email,password FROM USUARIO WHERE email = $1",
      [email]
    );

    if(result.rows.length === 0) {
      return res.status(401).json({message: "Usuario o Contraseña incorrectos"});
    }

    const user = result.rows[0];

    const passwordValid = await bcrypt.compare(password, user.password);
    if(!passwordValid) {
      return res.status(401).json({message: "Contraseña incorrecta"});
    }

    res.json({
      message: "Acceso correcto",
      user: {
        rut: user.rut,
        nombre: user.nombre,
        email: user.email
      },
    });

  }catch(error: any) {
    res.status(500).json({message: "Error en el servidor", error});
  }

});

export default router;
