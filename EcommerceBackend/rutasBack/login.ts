import { Router, Request, Response } from 'express';
import { pool } from '../db';
import bcrypt from 'bcrypt';

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    
    if ((!username && !email) || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username/email y password son requeridos' 
      });
    }
    
    // Buscar usuario por username o email
    const searchValue = username || email;
    const result = await pool.query(
      'SELECT rut, nombre, email, password FROM USUARIO WHERE nombre = $1 OR email = $1',
      [searchValue]
    );
    
    if (result.rows.length === 0) {
      return res.status(401).json({ 
        success: false, 
        message: 'Usuario o Contraseña incorrectos' 
      });
    }
    
    const user = result.rows[0];
    
    // Verificar contraseña
    const passwordValid = await bcrypt.compare(password, user.password);
    
    if (passwordValid) {
      res.json({ 
        success: true, 
        message: 'Acceso correcto',
        user: { 
          rut: user.rut, 
          nombre: user.nombre, 
          email: user.email 
        }
      });
    } else {
      res.status(401).json({ 
        success: false, 
        message: 'Contraseña incorrecta' 
      });
    }
  } catch (error: any) {
    console.error('Error en login:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error en el servidor',
      error: error.message
    });
  }
});

router.get("/", (req: Request, res: Response) => {
  res.send("Login endpoint - use POST method");
});

export default router;