import { Router, Request, Response } from 'express';
import { agregarUsuario, usuarioExiste } from '../../EcommerceBD/dbManager';

const router = Router();

router.post("/", (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body;
    
    if (!username || !password || !email) {
      return res.status(400).json({ 
        success: false, 
        error: 'Username, password y email son requeridos' 
      });
    }

    if (username.length < 3) {
      return res.status(400).json({ 
        success: false, 
        error: 'El username debe tener al menos 3 caracteres' 
      });
    }

    if (password.length < 4) {
      return res.status(400).json({ 
        success: false, 
        error: 'La contraseña debe tener al menos 4 caracteres' 
      });
    }

    if (usuarioExiste(username)) {
      return res.status(409).json({ 
        success: false, 
        error: 'El usuario ya existe' 
      });
    }
    
    const nuevoUsuario = agregarUsuario(username, password, email);
    
    if (nuevoUsuario) {
      res.json({ 
        success: true, 
        message: 'Usuario registrado exitosamente',
        user: { 
          id: nuevoUsuario.id, 
          username: nuevoUsuario.username, 
          email: nuevoUsuario.email 
        }
      });
    } else {
      res.status(500).json({ 
        success: false, 
        error: 'Error al crear el usuario' 
      });
    }
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error interno del servidor' 
    });
  }
});

router.get("/", (req: Request, res: Response) => {
  res.send("SignUp endpoint - use POST method");
});

export default router;