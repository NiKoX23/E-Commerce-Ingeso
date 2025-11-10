# 📋 Análisis de Código y Mejoras Sugeridas

## 🔴 CRÍTICOS - Arreglar primero

### 1. **AuthProvider: Campo incorrecto en login**
**Archivo:** `EcommerceFront/src/Autenticacion/AuthProvider.tsx`

**Problema:**
```typescript
body: JSON.stringify({ username, password }), // ❌ INCORRECTO
```
El backend espera `email`, no `username`.

**Solución:**
```typescript
body: JSON.stringify({ email, password }), // ✅ CORRECTO
```

---

### 2. **Rutas incompletas en el Backend**
**Archivos afectados:**
- `rutasBack/user.ts`
- `rutasBack/refreshToken.ts`
- `rutasBack/signout.ts`

**Problema:** Estas rutas solo devuelven mensajes de texto, no hacen nada útil.

**Soluciones sugeridas:**

#### `user.ts` - Obtener datos del usuario actual
```typescript
import { Router, Request, Response } from "express";
import { pool } from "../db";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const userEmail = req.headers['x-user-email'] as string; // O usar JWT
    
    if (!userEmail) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no autenticado'
      });
    }

    const result = await pool.query(
      'SELECT rut, nombre, email FROM USUARIO WHERE email = $1',
      [userEmail]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    res.json({
      success: true,
      user: result.rows[0]
    });
  } catch (error: any) {
    console.error('Error en obtener usuario:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error en el servidor'
    });
  }
});

export default router;
```

#### `signout.ts` - Cerrar sesión
```typescript
import { Router, Request, Response } from "express";

const router = Router();

router.post("/", (req: Request, res: Response) => {
  try {
    // Aquí podrías:
    // 1. Invalidar JWT tokens (usar una blacklist)
    // 2. Limpiar sesiones en base de datos
    
    res.json({
      success: true,
      message: 'Sesión cerrada correctamente'
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      message: 'Error en el servidor',
      error: error.message
    });
  }
});

export default router;
```

#### `refreshToken.ts` - Renovar token JWT
```typescript
import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/", (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: 'Refresh token requerido'
      });
    }

    const decoded = jwt.verify(
      refreshToken, 
      process.env.JWT_REFRESH_SECRET || 'your-secret'
    );

    const newAccessToken = jwt.sign(
      { email: (decoded as any).email },
      process.env.JWT_SECRET || 'your-secret',
      { expiresIn: '15m' }
    );

    res.json({
      success: true,
      accessToken: newAccessToken
    });
  } catch (error: any) {
    res.status(401).json({ 
      success: false, 
      message: 'Token inválido',
      error: error.message
    });
  }
});

export default router;
```

---

### 3. **AuthProvider: Sin tokens JWT**
**Problema:** Tu aplicación usa `localStorage` pero sin JWT. Los tokens son más seguros.

**Mejora:** Implementar JWT tokens
```typescript
// En login.ts (backend)
import jwt from 'jsonwebtoken';

// Después de verificar contraseña:
const token = jwt.sign(
  { email: user.email, rut: user.rut },
  process.env.JWT_SECRET || 'your-secret-key',
  { expiresIn: '24h' }
);

res.json({
  success: true,
  token, // Enviar token
  user: { rut: user.rut, nombre: user.nombre, email: user.email }
});
```

---

## 🟡 IMPORTANTES - Agregar funcionalidad

### 4. **CarritoContext: Falta eliminar y actualizar productos**

**Problema:** Solo puedes agregar y limpiar, pero no puedes:
- Eliminar un producto específico
- Actualizar cantidad
- Calcular total

**Mejora:**
```typescript
export type ProductoCarrito = {
  id: number;
  nombre: string;
  precio: number; // ← Agregar precio
  cantidad: number;
};

interface CarritoContextType {
  productos: ProductoCarrito[];
  agregarProducto: (producto: ProductoCarrito) => void;
  eliminarProducto: (id: number) => void; // ← NUEVO
  actualizarCantidad: (id: number, cantidad: number) => void; // ← NUEVO
  obtenerTotal: () => number; // ← NUEVO
  limpiarCarrito: () => void;
}

const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) throw new Error('useCarrito debe usarse dentro de CarritoProvider');
  return context;
};

export const CarritoProvider = ({ children }: { children: ReactNode }) => {
  const [productos, setProductos] = useState<ProductoCarrito[]>([]);

  const agregarProducto = (producto: ProductoCarrito) => {
    setProductos(prev => {
      const existe = prev.find(p => p.id === producto.id);
      if (existe) {
        return prev.map(p => 
          p.id === producto.id 
            ? { ...p, cantidad: p.cantidad + producto.cantidad } 
            : p
        );
      }
      return [...prev, producto];
    });
  };

  const eliminarProducto = (id: number) => {
    setProductos(prev => prev.filter(p => p.id !== id));
  };

  const actualizarCantidad = (id: number, cantidad: number) => {
    if (cantidad <= 0) {
      eliminarProducto(id);
      return;
    }
    setProductos(prev =>
      prev.map(p => p.id === id ? { ...p, cantidad } : p)
    );
  };

  const obtenerTotal = () => {
    return productos.reduce((total, p) => total + (p.precio * p.cantidad), 0);
  };

  const limpiarCarrito = () => setProductos([]);

  return (
    <CarritoContext.Provider 
      value={{ 
        productos, 
        agregarProducto, 
        eliminarProducto,
        actualizarCantidad,
        obtenerTotal,
        limpiarCarrito 
      }}>
      {children}
    </CarritoContext.Provider>
  );
};
```

---

### 5. **Validación de formularios incompleta**

**Problemas en SignUp.tsx y Login.tsx:**
- No valida formato de email
- No valida RUT
- No valida longitud de contraseña
- No muestra errores específicos

**Mejora:** Agregar validaciones
```typescript
// Funciones de validación
const validarEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const validarRUT = (rut: string): boolean => {
  const regex = /^\d{7,8}-[0-9kK]$/;
  return regex.test(rut);
};

const validarContraseña = (password: string): boolean => {
  // Mínimo 8 caracteres, al menos una mayúscula, un número
  return password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
};

// En handleSubmit:
if (!validarEmail(email)) {
  alert("Email inválido");
  return;
}

if (!validarRUT(rut)) {
  alert("RUT inválido. Formato: 12345678-9");
  return;
}

if (!validarContraseña(password)) {
  alert("La contraseña debe tener al menos 8 caracteres, una mayúscula y un número");
  return;
}
```

---

## 🟢 RECOMENDACIONES - Mejorar código

### 6. **Variables de entorno en Frontend**
**Problema:** URL del backend está hardcodeada en todos lados: `http://localhost:5000`

**Solución:** Crear archivo `.env`
```env
VITE_API_URL=http://localhost:5000
```

**Usar en código:**
```typescript
const API_URL = import.meta.env.VITE_API_URL;

const response = await fetch(`${API_URL}/api/login`, {
  // ...
});
```

---

### 7. **Crear servicio API centralizado**
**Problema:** Cada componente repite la lógica fetch

**Solución:** Crear `src/services/api.ts`
```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const apiService = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  signup: async (nombre: string, rut: string, email: string, password: string) => {
    const response = await fetch(`${API_URL}/api/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, rut, email, password }),
    });
    return response.json();
  },

  logout: async () => {
    const response = await fetch(`${API_URL}/api/signOut`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  },
};
```

**Usar:**
```typescript
const data = await apiService.login(email, password);
```

---

### 8. **Manejo de errores mejorado**
**Problema:** Usa simples `alert()` para errores

**Mejora:** Crear componente Toast o notificaciones
```typescript
// Usar PrimeReact Toast
import { Toast } from 'primereact/toast';
import { useRef } from 'react';

const toastRef = useRef<Toast>(null);

toastRef.current?.show({ 
  severity: 'success', 
  summary: 'Éxito', 
  detail: 'Sesión iniciada' 
});

toastRef.current?.show({ 
  severity: 'error', 
  summary: 'Error', 
  detail: data.message 
});
```

---

### 9. **Falta ruta de productos**
**Problema:** No hay endpoint para obtener productos

**Solución:** Crear `rutasBack/productos.ts`
```typescript
import { Router, Request, Response } from "express";
import { pool } from "../db";

const router = Router();

// Obtener todos los productos
router.get("/", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM PRODUCTO");
    res.json({
      success: true,
      productos: result.rows
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener productos',
      error: error.message
    });
  }
});

// Obtener producto por ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM PRODUCTO WHERE id = $1",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }
    res.json({
      success: true,
      producto: result.rows[0]
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener producto',
      error: error.message
    });
  }
});

export default router;
```

**Registrar en app.ts:**
```typescript
import productosRouter from './rutasBack/productos';
app.use('/api/productos', productosRouter);
```

---

### 10. **Seguridad: Agregar CORS más restrictivo**
**Problema:** CORS permite todas las originenes `cors()`

**Mejora:**
```typescript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

---

### 11. **Rate limiting y validación de entrada**
**Agreggar validación en backend:**
```typescript
import rateLimit from 'express-rate-limit';

// Limitar intentos de login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // 5 intentos
  message: 'Demasiados intentos de login. Intente más tarde.'
});

router.post("/", loginLimiter, async (req: Request, res: Response) => {
  // ...
});
```

---

### 12. **Tipos TypeScript mejorados**
**Crear `src/types/index.ts`:**
```typescript
export interface Usuario {
  rut: string;
  nombre: string;
  email: string;
}

export interface ProductoCarrito {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
}

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  stock: number;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: Usuario;
}
```

---

## 📝 RESUMEN DE PRIORIDADES

| Prioridad | Tarea | Impacto |
|-----------|-------|--------|
| 🔴 CRÍTICA | Corregir `username` → `email` en AuthProvider | Login fallará |
| 🔴 CRÍTICA | Implementar JWT tokens | Seguridad débil |
| 🟡 ALTA | Completar rutas (user, signout, refreshToken) | Funcionalidad incompleta |
| 🟡 ALTA | Agregar métodos a CarritoContext (eliminar, actualizar) | UX deficiente |
| 🟡 ALTA | Crear endpoint de productos | Frontend no funciona |
| 🟢 MEDIA | Validaciones de formularios | Datos inválidos |
| 🟢 MEDIA | Usar .env para URLs | Facilita despliegue |
| 🟢 MEDIA | Crear servicio API centralizado | Código limpio |

---

## ✅ Resultado esperado
Al implementar estas mejoras tendrás:
- ✅ Autenticación segura con JWT
- ✅ Carrito funcional completo
- ✅ Validaciones robustas
- ✅ Código mantenible
- ✅ Mejor UX
- ✅ Mejor seguridad

¿Quieres que implemente alguna de estas mejoras?
