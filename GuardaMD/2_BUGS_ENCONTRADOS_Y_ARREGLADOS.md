# 🐛 Bugs Encontrados y Arreglados

## Bug #1: Autenticación usando username en lugar de email
**Severidad**: 🔴 CRÍTICA  
**Estado**: ✅ ARREGLADO

### El Problema:
El formulario de login/signup usaba un campo `username` pero la BD esperaba `email`.

**Antes:**
```typescript
// Login.tsx
const usuario = { username: emailValue, contraseña: passwordValue };
POST /api/usuarios/login

// Backend ruta login.ts esperaba:
{
  username: string,
  contraseña: string
}
```

**Después:**
```typescript
// Login.tsx - CORREGIDO
const usuario = { email: emailValue, contraseña: passwordValue };
POST /api/usuarios/login

// Backend login.ts - CORREGIDO
Ahora recibe email en lugar de username
```

### Impacto:
- ❌ Los usuarios no podían autenticarse
- ❌ Las credenciales no coincidían con BD
- ✅ FIJO: Ahora usa email correctamente

---

## Bug #2: Productos sin stock inicial
**Severidad**: 🟡 MEDIA  
**Estado**: ✅ ARREGLADO

### El Problema:
Los 21 productos en BD no tenían valores en la columna `stock`.

**Solución:**
Se cargaron todos los productos con stock inicial:
- Zapatillas: 20 unidades (7 productos)
- Camisetas: 15 unidades (7 productos)
- Shorts: 12 unidades (7 productos)

### Verificación:
```sql
SELECT tipo, COUNT(*) as cantidad, AVG(stock) as stock_promedio 
FROM PRODUCTO 
GROUP BY tipo;
-- Resultado: ZAPATILLA=7, CAMISETA=7, SHORT=7
```

---

## Bug #3: AllProductsBar.tsx usando array hardcoded
**Severidad**: 🟡 MEDIA  
**Estado**: ✅ ARREGLADO

### El Problema:
El componente tenía un array hardcoded de productos. No traía datos de la API.

**Antes:**
```typescript
const PRODUCTOS = [
  { id: 1, nombre: "Nike Air Max", precio: 150, ... },
  { id: 2, nombre: "Adidas Ultraboost", precio: 180, ... },
  // ... etc
];

return (
  <div>
    {PRODUCTOS.map(prod => <ProductCard key={prod.id} {...prod} />)}
  </div>
);
```

**Después:**
```typescript
const [productos, setProductos] = useState<Producto[]>([]);
const [cargando, setCargando] = useState(true);

useEffect(() => {
  const url = categoriaFiltrada 
    ? `/api/productos/categoria/${categoriaFiltrada}`
    : `/api/productos`;
  
  fetch(url)
    .then(res => res.json())
    .then(data => {
      setProductos(data.productos || data);
      setCargando(false);
    })
    .catch(() => setProductos([]));
}, [categoriaFiltrada]);

return (
  <>
    {cargando && <p>Cargando productos...</p>}
    <div>
      {productos.map(prod => <ProductCard key={prod.id_producto} {...prod} />)}
    </div>
  </>
);
```

### Impacto:
- ❌ No reflejaba cambios en BD
- ❌ No había filtrado por categoría
- ✅ FIJO: Ahora trae datos reales del API

---

## Bug #4: ProductoDetalle.tsx sin datos del API
**Severidad**: 🟡 MEDIA  
**Estado**: ✅ ARREGLADO

### El Problema:
El componente tenía un objeto `producto` hardcoded. No traía datos de la BD.

**Antes:**
```typescript
const producto = {
  id: 1,
  nombre: "Nike Air Max",
  precio: 150,
  // ... etc
};
```

**Después:**
```typescript
const [producto, setProducto] = useState<Producto | null>(null);

useEffect(() => {
  fetch(`/api/productos/${id}`)
    .then(res => res.json())
    .then(data => {
      // El API retorna { success: true, producto: {...} }
      const productoData = data.producto || data;
      setProducto(productoData);
    })
    .catch(err => console.error("Error:", err));
}, [id]);

if (!producto) return <p>Cargando...</p>;

return (
  <div>
    <h1>{producto.marca}</h1>
    <p>Stock disponible: {producto.stock}</p>
    <p>${producto.precio.toLocaleString('es-CL')}</p>
  </div>
);
```

### Impacto:
- ❌ Mostraba siempre el mismo producto
- ❌ No reflejaba stock real
- ✅ FIJO: Ahora trae datos reales por ID

---

## Bug #5: Overselling (permitía agregar más del stock)
**Severidad**: 🔴 CRÍTICA  
**Estado**: ✅ ARREGLADO

### El Problema:
El usuario podía agregar 100 unidades aunque había solo 5 en stock.

**Ante:**
```typescript
// CarritoCompra.tsx
const handleAumentar = () => {
  actualizarCantidad(producto.id, cantidad + 1); // ❌ Sin validación
};
```

**Después - Frontend:**
```typescript
// CarritoContext.tsx
export const actualizarCantidad = (id: number, nuevaCantidad: number): boolean => {
  const producto = carrito.find(p => p.id === id);
  
  // ✅ Valida contra stock disponible
  if (nuevaCantidad > (producto?.stockDisponible || 0)) {
    return false; // No permite actualizar
  }
  
  setCarrito(prev =>
    prev.map(p =>
      p.id === id ? { ...p, cantidad: nuevaCantidad } : p
    )
  );
  return true;
};

// CarritoCompra.tsx
const handleAumentar = () => {
  const permitido = actualizarCantidad(producto.id, cantidad + 1);
  if (!permitido) {
    alert(`No hay suficiente stock. Máximo: ${producto.stockDisponible}`);
  }
};
```

**Después - Backend:**
```typescript
// filtroProductos.ts - POST /procesar-compra
app.post('/procesar-compra', async (req, res) => {
  const { productos } = req.body;
  
  // ✅ Valida ANTES de actualizar
  for (const item of productos) {
    const producto = await db.query(
      'SELECT stock FROM PRODUCTO WHERE id_producto = $1',
      [item.id]
    );
    
    if (producto.rows[0].stock < item.cantidad) {
      return res.status(400).json({
        error: `No hay suficiente stock de producto ${item.id}`
      });
    }
  }
  
  // ✅ Actualiza stock
  for (const item of productos) {
    await db.query(
      'UPDATE PRODUCTO SET stock = stock - $1 WHERE id_producto = $2',
      [item.cantidad, item.id]
    );
  }
  
  res.json({ success: true, mensaje: "Compra procesada" });
});
```

### Impacto:
- ❌ Podía vender más de lo disponible
- ❌ Inconsistencia BD/Carrito
- ✅ FIJO: Validación en frontend y backend

---

## Bug #6: CarritoCompra formateaba precios incorrectamente
**Severidad**: 🟡 MEDIA  
**Estado**: ✅ ARREGLADO

### El Problema:
```typescript
// ❌ Esto falla si precio es string o undefined
prod.precio.toFixed(2)
```

**Después:**
```typescript
// ✅ Conversión segura
const precioNum = parseFloat(prod.precio) || 0;
const precioFormato = precioNum.toLocaleString('es-CL', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});
// Resultado: "45.250,00" en lugar de "45250.00"
```

---

## Bug #7: Redirección post-compra iba a login
**Severidad**: 🟡 MEDIA  
**Estado**: ✅ ARREGLADO

### El Problema:
Después de procesar la compra, iba a `/` (que redirige a login).

**Antes:**
```typescript
// CarritoCompra.tsx
navigate('/'); // ❌ Va a login
```

**Después:**
```typescript
// CarritoCompra.tsx
navigate('/dashboard'); // ✅ Va al panel principal
```

---

## Bug #8: Imágenes de productos no cargaban
**Severidad**: 🟡 MEDIA  
**Estado**: ✅ ARREGLADO

### El Problema:
URLs de imágenes inconsistentes o rotadas.

**Solución:**
1. Se asignaron URLs confiables de Unsplash a todos los productos
2. Se agregó handler `onError` que muestra placeholder coloreado

```typescript
<img 
  src={imagen}
  onError={(e) => {
    e.currentTarget.src = generarColorPlaceholder(tipo);
  }}
  alt={marca}
/>
```

### Resultado:
- ✅ Imágenes cargan desde Unsplash
- ✅ Si falla, muestra color según categoría (azul=zapatos, rojo=camisetas, verde=shorts)

---

## 📊 Resumen de Fixes:

| # | Bug | Severidad | Estado |
|---|-----|-----------|--------|
| 1 | Username vs Email | 🔴 CRÍTICA | ✅ |
| 2 | Sin stock inicial | 🟡 MEDIA | ✅ |
| 3 | AllProductsBar hardcoded | 🟡 MEDIA | ✅ |
| 4 | ProductoDetalle hardcoded | 🟡 MEDIA | ✅ |
| 5 | Overselling | 🔴 CRÍTICA | ✅ |
| 6 | Formato de precios | 🟡 MEDIA | ✅ |
| 7 | Redirección post-compra | 🟡 MEDIA | ✅ |
| 8 | Imágenes inconsistentes | 🟡 MEDIA | ✅ |

**Total**: 8 bugs arreglados ✅ (0 pendientes)

