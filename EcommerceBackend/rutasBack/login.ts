import { Router, Request, Response } from 'express';
import { validarUsuario } from '../../EcommerceBD/dbManager';

const router = Router();

router.post("/", (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        error: 'Username y password son requeridos' 
      });
    }
    
    const usuario = validarUsuario(username, password);
    
    if (usuario) {
      res.json({ 
        success: true, 
        message: 'Login exitoso',
        user: { 
          id: usuario.id, 
          username: usuario.username, 
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