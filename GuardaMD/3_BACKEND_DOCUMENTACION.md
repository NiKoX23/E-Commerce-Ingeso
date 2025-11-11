# 🔧 Backend - Documentación Completa

## 📋 Estructura de las Tablas PostgreSQL

### 1️⃣ USUARIO
```sql
CREATE TABLE USUARIO (
  id_usuario SERIAL PRIMARY KEY,
  id_commerce INTEGER NOT NULL REFERENCES COMMERCE(id_commerce),
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  contraseña VARCHAR(255) NOT NULL (hasheada con bcrypt),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Campos:**
- `id_usuario`: PK autoincremental
- `nombre`: Nombre completo del usuario
- `email`: Email único (usado para login/signup)
- `contraseña`: Hash bcrypt (nunca se almacena en texto plano)

**Índices:**
- PK en id_usuario
- UNIQUE en email
- FK en id_commerce

---

### 2️⃣ PRODUCTO
```sql
CREATE TABLE PRODUCTO (
  id_producto SERIAL PRIMARY KEY,
  id_commerce INTEGER NOT NULL REFERENCES COMMERCE(id_commerce),
  tipo VARCHAR(50) NOT NULL, -- 'ZAPATILLA', 'CAMISETA', 'SHORT'
  marca VARCHAR(100) NOT NULL, -- 'NIKE', 'ADIDAS', 'PUMA'
  stock INTEGER NOT NULL DEFAULT 0,
  precio DECIMAL(10,2) NOT NULL,
  descripcion TEXT,
  imagen VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Campos:**
- `id_producto`: PK autoincremental
- `tipo`: Categoría (ZAPATILLA=zapatos, CAMISETA=remeras, SHORT=shorts)
- `marca`: Marca del producto
- `stock`: Unidades disponibles (int)
- `precio`: Precio unitario (2 decimales)
- `descripcion`: Descripción larga
- `imagen`: URL a imagen en Unsplash

**Stock Inicial:**
| Tipo | Cantidad | Stock por producto |
|------|----------|-------------------|
| ZAPATILLA | 7 | 20 |
| CAMISETA | 7 | 15 |
| SHORT | 7 | 12 |
| **TOTAL** | **21** | - |

---

### 3️⃣ COMPRA
```sql
CREATE TABLE COMPRA (
  id_compra SERIAL PRIMARY KEY,
  id_usuario INTEGER NOT NULL REFERENCES USUARIO(id_usuario),
  id_commerce INTEGER NOT NULL REFERENCES COMMERCE(id_commerce),
  total DECIMAL(10,2) NOT NULL,
  estado VARCHAR(50) DEFAULT 'PENDIENTE',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Campos:**
- `id_compra`: PK autoincremental
- `id_usuario`: Quién compró
- `total`: Suma de (precio × cantidad)
- `estado`: PENDIENTE, PAGADA, CANCELADA

---

### 4️⃣ DETALLE_COMPRA
```sql
CREATE TABLE DETALLE_COMPRA (
  id_detalle SERIAL PRIMARY KEY,
  id_compra INTEGER NOT NULL REFERENCES COMPRA(id_compra),
  id_producto INTEGER NOT NULL REFERENCES PRODUCTO(id_producto),
  cantidad INTEGER NOT NULL,
  precio_unitario DECIMAL(10,2) NOT NULL
);
```

**Campos:**
- `id_detalle`: PK autoincremental
- `id_compra`: FK a qué compra pertenece
- `id_producto`: Qué producto
- `cantidad`: Cuántos se compraron
- `precio_unitario`: Precio en momento de compra

---

### 5️⃣ COMMERCE
```sql
CREATE TABLE COMMERCE (
  id_commerce SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  email_contacto VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Usa:**
- Tabla "raíz" que agrupa usuarios y productos
- Actualmente solo 1 commerce para la demo

---

### 6️⃣ TOKEN_REFRESH
```sql
CREATE TABLE TOKEN_REFRESH (
  id SERIAL PRIMARY KEY,
  id_usuario INTEGER NOT NULL REFERENCES USUARIO(id_usuario),
  refresh_token VARCHAR(500) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Usa:**
- Almacena refresh tokens para renovar sesiones
- Tokens con expiración de 7 días

---

## 🌐 Rutas del Backend

### 📁 `/rutasBack/`
Contiene todas las rutas del API.

---

### 🔐 Autenticación

#### POST `/api/usuarios/signup`
**Body:**
```json
{
  "nombre": "Diego Messi",
  "email": "diego@gmail.com",
  "contraseña": "MiContraseña123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "mensaje": "Usuario creado exitosamente",
  "usuario": {
    "id_usuario": 5,
    "nombre": "Diego Messi",
    "email": "diego@gmail.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Errores:**
- 400: Email ya existe
- 500: Error BD

---

#### POST `/api/usuarios/login`
**Body:**
```json
{
  "email": "diego@gmail.com",
  "contraseña": "MiContraseña123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "usuario": {
    "id_usuario": 5,
    "nombre": "Diego Messi",
    "email": "diego@gmail.com"
  }
}
```

**Errores:**
- 400: Email o contraseña incorrectos
- 404: Usuario no existe

---

#### POST `/api/usuarios/refresh-token`
**Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

#### POST `/api/usuarios/signout`
**Body:**
```json
{
  "id_usuario": 5
}
```

**Response (200):**
```json
{
  "success": true,
  "mensaje": "Sesión cerrada"
}
```

---

### 📦 Productos

#### GET `/api/productos`
Obtiene TODOS los productos (21 en total).

**Response (200):**
```json
{
  "success": true,
  "productos": [
    {
      "id_producto": 1,
      "tipo": "ZAPATILLA",
      "marca": "NIKE",
      "stock": 20,
      "precio": 145.99,
      "descripcion": "Nike Air Max 90 - Clásica...",
      "imagen": "https://images.unsplash.com/...",
      "created_at": "2024-01-15T10:30:00Z"
    },
    { ... 20 más }
  ]
}
```

---

#### GET `/api/productos/categoria/:tipo`
Filtra por categoría.

**Parámetros:**
- `tipo`: ZAPATILLA | CAMISETA | SHORT

**Ejemplo:** `/api/productos/categoria/ZAPATILLA`

**Response (200):**
```json
{
  "success": true,
  "productos": [
    { ... 7 zapatillas }
  ]
}
```

**Errores:**
- 404: Tipo de categoría no válida

---

#### GET `/api/productos/:id`
Obtiene un producto específico.

**Ejemplo:** `/api/productos/3`

**Response (200):**
```json
{
  "success": true,
  "producto": {
    "id_producto": 3,
    "tipo": "CAMISETA",
    "marca": "ADIDAS",
    "stock": 15,
    "precio": 49.99,
    "descripcion": "...",
    "imagen": "https://...",
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

**Errores:**
- 404: Producto no existe

---

#### POST `/api/productos/procesar-compra`
Procesa una compra (valida y decrementa stock).

**Body:**
```json
{
  "productos": [
    { "id": 1, "cantidad": 2 },
    { "id": 5, "cantidad": 1 },
    { "id": 10, "cantidad": 3 }
  ]
}
```

**Validaciones:**
1. ✅ Verifica que cada producto tenga stock suficiente
2. ✅ Si CUALQUIER producto no tiene stock → retorna error
3. ✅ Si TODO tiene stock → decrementa TODOS atomicamente

**Response (200):**
```json
{
  "success": true,
  "mensaje": "Compra procesada exitosamente"
}
```

**Errores:**
- 400: "No hay suficiente stock de producto X"
- 500: Error en actualización BD

**Lógica Backend:**
```typescript
// 1. Validar todos antes de actualizar
for (const item of productos) {
  const result = await db.query(
    'SELECT stock FROM PRODUCTO WHERE id_producto = $1',
    [item.id]
  );
  
  if (result.rows[0].stock < item.cantidad) {
    return res.status(400).json({
      error: `No hay suficiente stock de producto ${item.id}`
    });
  }
}

// 2. Si todo es OK, actualizar todos
for (const item of productos) {
  await db.query(
    'UPDATE PRODUCTO SET stock = stock - $1 WHERE id_producto = $2',
    [item.cantidad, item.id]
  );
}
```

---

#### POST `/api/productos/renovar-stock`
Renueva el stock a valores iniciales (solo admin).

**Body (opción 1 - todos):**
```json
{
  "renovarTodos": true
}
```

**Body (opción 2 - uno específico):**
```json
{
  "id_producto": 5,
  "nuevoStock": 25
}
```

**Response (200):**
```json
{
  "success": true,
  "mensaje": "Stock renovado"
}
```

**Valores de Renovación Automática:**
```sql
CASE tipo
  WHEN 'ZAPATILLA' THEN 20
  WHEN 'CAMISETA' THEN 15
  WHEN 'SHORT' THEN 12
END
```

**Nota:** ⚠️ **SIN AUTENTICACIÓN JWT** - Se controla desde el frontend con un modal con usuario/contraseña fijos (admin/admin123).

---

## 🔌 Configuración de Conexión BD

**Archivo:** `/EcommerceBackend/db.ts`

```typescript
const db = new Pool({
  user: 'postgres',
  password: 'tu_password',
  host: 'localhost',
  port: 5432,
  database: 'ecommerce_db'
});
```

**Variables Requeridas:**
- PostgreSQL debe estar corriendo en localhost:5432
- Base de datos: `ecommerce_db`
- Usuario: `postgres`

---

## 🚀 Iniciar el Backend

```bash
cd /home/diegomessi/Escritorio/E-Commerce-Ingeso/EcommerceBackend
npm install
npx tsc  # Compilar TypeScript
npm start  # Inicia en puerto 3000
```

**URL Base:** `http://localhost:3000/api`

---

## 📊 Resumen de Endpoints

| Método | Ruta | Función | Stock |
|--------|------|---------|-------|
| POST | `/usuarios/signup` | Crear usuario | N/A |
| POST | `/usuarios/login` | Iniciar sesión | N/A |
| POST | `/usuarios/refresh-token` | Renovar token | N/A |
| POST | `/usuarios/signout` | Cerrar sesión | N/A |
| GET | `/productos` | Obtener todos | - |
| GET | `/productos/categoria/:tipo` | Filtrar por categoría | - |
| GET | `/productos/:id` | Obtener uno | - |
| POST | `/productos/procesar-compra` | Procesar compra | ✅ Decrementa |
| POST | `/productos/renovar-stock` | Renovar stock (admin) | ✅ Resetea |

