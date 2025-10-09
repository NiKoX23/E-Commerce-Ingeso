import { Router, Request, Response } from 'express';
import { pool } from '../db';
import bcrypt from 'bcrypt';

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        error: 'Username y password son requeridos' 
      });
    }
    
    // Buscar usuario en PostgreSQL
    const result = await pool.query(
      'SELECT rut, nombre, email, password FROM USUARIO WHERE nombre = $1 OR email = $1',
      [username]
    );
    
    if (result.rows.length === 0) {
      return res.status(401).json({ 
        success: false, 
        error: 'Credenciales inválidas' 
      });
    }
    
    const usuario = result.rows[0];
    
    // Verificar contraseña
    const passwordValid = await bcrypt.compare(password, usuario.password);
    
    if (passwordValid) {
      res.json({ 
        success: true, 
        message: 'Login exitoso',
        user: { 
          rut: usuario.rut, 
          nombre: usuario.nombre, 
          email: usuario.email 
        }
      });
    } else {
      res.status(401).json({ 
        success: false, 
        error: 'Credenciales inválidas' 
      });
    }
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error interno del servidor' 
    });
  }
});

router.get("/", (req: Request, res: Response) => {
  res.send("Login endpoint - use POST method");
});

export default router;