# 📚 ÍNDICE MAESTRO - SCRIPTS Y DOCUMENTACIÓN DE BD

## 🎯 PUNTO DE PARTIDA

Si eres un nuevo admin y necesitas configurar la BD desde cero, empieza aquí:

### **Opción 1: Automática (Recomendado)**
```bash
cd /home/diegomessi/Escritorio/E-Commerce-Ingeso
bash instalar_bd.sh
```
✅ El script hace todo automáticamente
✅ Verifica requisitos previos
✅ Crea la BD si no existe
✅ Ejecuta el script SQL
✅ Muestra resumen de instalación

### **Opción 2: Manual (Si tienes experiencia)**
```bash
cd /home/diegomessi/Escritorio/E-Commerce-Ingeso
psql -U postgres -d Ecommerce -f EcommerceBD_Completa.sql
```

---

## 📂 ESTRUCTURA DE ARCHIVOS

```
E-Commerce-Ingeso/
│
├─ 📊 BASE DE DATOS
│  ├─ EcommerceBD_Completa.sql      ⭐ SCRIPT PRINCIPAL (11KB)
│  │  └─ Contiene: Todas las tablas + 24 productos + datos iniciales
│  │
│  ├─ ConsultasUtiles_BD.sql         📋 Referencia de consultas (7.9KB)
│  │  └─ Contiene: 40+ consultas útiles para administración
│  │
│  ├─ instalar_bd.sh                 🔧 Script de instalación (6.1KB)
│  │  └─ Instalador automático con verificaciones
│  │
│  ├─ ⚠️ Script_Tablas_ECommerce.sql (ANTIGUO - ya está en Completa.sql)
│  ├─ ⚠️ AgregarProductos.sql        (ANTIGUO - ya está en Completa.sql)
│  └─ ⚠️ AgregarResenas.sql          (ANTIGUO - ya está en Completa.sql)
│
├─ 📖 DOCUMENTACIÓN
│  ├─ README_BD.md                   📘 Guía completa (4.4KB)
│  │  ├─ Instrucciones de uso
│  │  ├─ Descripción de tablas
│  │  ├─ Datos incluidos
│  │  ├─ Troubleshooting
│  │  └─ Checklist de instalación
│  │
│  ├─ RESUMEN_BD.md                  📗 Resumen ejecutivo (4.8KB)
│  │  ├─ Archivos generados
│  │  ├─ Estructura de datos
│  │  ├─ Productos incluidos
│  │  ├─ Conexión con backend/frontend
│  │  └─ Checklist final
│  │
│  └─ INDICE_MAESTRO.md              📚 Este archivo
│
├─ EcommerceBackend/
│  ├─ RecommendedBar.ts              🔗 Obtiene productos de la BD
│  └─ app.ts                         📍 Ruta: /api/recomendados/recommended
│
└─ EcommerceFront/
   └─ RecommendedBar.tsx             🎨 Consume datos de la API
```

---

## 🚀 FLUJO DE TRABAJO RECOMENDADO

### Paso 1️⃣: Instalar la BD
```bash
bash instalar_bd.sh
```

### Paso 2️⃣: Reiniciar Backend
```bash
cd EcommerceBackend
npm run dev
```

### Paso 3️⃣: Reiniciar Frontend
```bash
cd EcommerceFront
npm run dev
```

### Paso 4️⃣: Verificar
- Abre http://localhost:5173 (o tu puerto)
- Deberías ver "Productos recomendados ⭐" con datos reales
- Si ves "No se pudieron cargar..." → Revisa la sección de troubleshooting

---

## 📊 CONTENIDO DE LA BD

### Tablas (11 Total)
| Tabla | Filas | Descripción |
|-------|-------|-------------|
| USUARIO | 1+ | Usuarios del sistema |
| TARJETA | 1+ | Tarjetas de crédito |
| COMPRA | 1+ | Órdenes de compra |
| FACTURA | 1+ | Facturas emitidas |
| ECOMMERCE | 1 | Datos del e-commerce |
| CARRITO | 1+ | Carritos de usuarios |
| PRODUCTO | 24 | Catálogo de productos ⭐ |
| ITEM | 1+ | Items en carritos |
| CAMISETAS | Variable | Detalles de camisetas |
| SHORTS | Variable | Detalles de shorts |
| ZAPATILLAS | Variable | Detalles de zapatillas |

### Productos (24 Total)
- **6 Zapatillas:** NIKE, ADIDAS, PUMA → $65K - $90K
- **6 Camisetas:** NIKE, ADIDAS, PUMA → $39K - $50K
- **6 Shorts:** NIKE, ADIDAS, PUMA → $30K - $37K
- **3 Iniciales:** Ejemplos de datos

**Todas con:**
✅ Reseñas (4.5 - 4.9 estrellas)
✅ Descripciones detalladas
✅ URLs de imágenes
✅ Stock disponible

---

## 🔍 CONSULTAS RÁPIDAS

### Ver productos recomendados (lo que ve el frontend)
```bash
psql -U postgres -d Ecommerce -c "SELECT id_producto, marca, tipo, reseña FROM producto WHERE stock > 0 ORDER BY reseña DESC LIMIT 10;"
```

### Contar productos por tipo
```bash
psql -U postgres -d Ecommerce -c "SELECT tipo, COUNT(*) FROM producto GROUP BY tipo;"
```

### Ver una camiseta específica
```bash
psql -U postgres -d Ecommerce -c "SELECT * FROM camisetas WHERE id_producto = 1;"
```

### Ver carrito de usuario
```bash
psql -U postgres -d Ecommerce -c "SELECT i.*, p.marca, p.tipo, p.precio FROM item i JOIN producto p ON i.id_prod = p.id_producto;"
```

---

## 📚 DOCUMENTACIÓN DETALLADA

### Para entender TODO
→ Lee **README_BD.md**
- Instrucciones paso a paso
- Explicación de cada tabla
- Solución de problemas
- Checklist de verificación

### Para un resumen rápido
→ Lee **RESUMEN_BD.md**
- Vista general del proyecto
- Archivos generados
- Estructura de datos
- Integración backend/frontend

### Para queries de administración
→ Usa **ConsultasUtiles_BD.sql**
- 40+ consultas SQL listas para usar
- Copia y pega en psql
- Desde reportes hasta actualizaciones

---

## 🛠️ TAREAS COMUNES

### Agregar un nuevo producto
```sql
INSERT INTO PRODUCTO(ID_COMMERCE, TIPO, MARCA, STOCK, PRECIO, DESCRIPCION, IMAGEN, RESEÑA)
VALUES(777, 'ZAPATILLA', 'NUEVA_MARCA', 10, 75000, 'Descripción', 'url_imagen', 4.7);
```

### Actualizar reseña
```sql
UPDATE PRODUCTO SET reseña = 4.9 WHERE id_producto = 5;
```

### Ver todos los productos ordenados por reseña
```sql
SELECT * FROM PRODUCTO WHERE STOCK > 0 ORDER BY reseña DESC;
```

### Buscar por marca
```sql
SELECT * FROM PRODUCTO WHERE marca = 'NIKE';
```

---

## 🆘 TROUBLESHOOTING RÁPIDO

| Problema | Solución |
|----------|----------|
| "relation usuario does not exist" | Crear tabla USUARIO primero |
| "No se cargan productos recomendados" | Reiniciar backend (npm run dev) |
| "Error de conexión a PostgreSQL" | Iniciar PostgreSQL: sudo service postgresql start |
| "Puerto 5000 en uso" | Cambiar puerto en .env del backend |
| "No se ven imágenes" | Las URLs de imágenes pueden estar caídas, agregar nuevas |

---

## 📞 SOPORTE Y REFERENCIAS

### Archivos Principales
- **EcommerceBD_Completa.sql** - El script más importante
- **instalar_bd.sh** - Instalación automática
- **README_BD.md** - Guía completa
- **ConsultasUtiles_BD.sql** - Referencia de queries

### Conexión Frontend-Backend
- **Backend:** `EcommerceBackend/RecommendedBar.ts`
  - Endpoint: `/api/recomendados/recommended`
  - Query: TOP 10 productos por reseña

- **Frontend:** `EcommerceFront/src/componentes/RecommendedBar.tsx`
  - Consume desde `http://localhost:5000/api/recomendados/recommended`
  - Muestra 10 productos con mejor reseña

---

## ✅ CHECKLIST PRE-PRODUCCIÓN

- [ ] Ejecuté `bash instalar_bd.sh`
- [ ] No hay errores en la instalación
- [ ] Conté 24 productos en la BD
- [ ] Reinicié el backend
- [ ] Reinicié el frontend
- [ ] Veo "Productos recomendados" en la página
- [ ] Los productos tienen imágenes
- [ ] Los productos tienen reseñas
- [ ] Puedo hacer click en los productos
- [ ] Todo funciona sin errores

---

## 🎉 ¡LISTO!

Tu base de datos está completamente configurada y lista para producción.

**Resumen de lo que se creó:**
- ✅ Base de datos con 11 tablas
- ✅ 24 productos con reseñas
- ✅ Backend conectado a la BD
- ✅ Frontend consumiendo datos reales
- ✅ Documentación completa
- ✅ Instalador automático

**Siguiente paso:** Agrega más funcionalidades según necesites 🚀

---

*Última actualización: 11 de noviembre de 2025*
*Creado con ❤️ para el E-Commerce*
