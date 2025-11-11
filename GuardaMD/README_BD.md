# 📊 Base de Datos E-Commerce - Guía de Instalación

## 📋 Descripción

El archivo `EcommerceBD_Completa.sql` contiene el script completo de la base de datos para el E-Commerce, incluyendo:

✅ **Creación de todas las tablas**
✅ **Datos iniciales precargados**
✅ **Productos con reseñas y descripciones**
✅ **Productos recomendados configurados**
✅ **Ejemplos de usuarios, compras y facturas**

## 🚀 Instrucciones de Uso

### Opción 1: Usar psql desde el terminal

```bash
# Navegar al directorio del proyecto
cd /home/diegomessi/Escritorio/E-Commerce-Ingeso

# Ejecutar el script en la base de datos
psql -U postgres -d Ecommerce -f EcommerceBD_Completa.sql
```

### Opción 2: Desde pgAdmin o cliente PostgreSQL gráfico

1. Abre tu cliente de PostgreSQL (pgAdmin, DBeaver, etc.)
2. Conéctate a la base de datos `Ecommerce`
3. Abre el archivo `EcommerceBD_Completa.sql`
4. Ejecuta el script completo

### Opción 3: Copiar y pegar en la consola PostgreSQL

```bash
psql -U postgres -d Ecommerce
```

Luego dentro de psql, ejecuta:

```sql
\i EcommerceBD_Completa.sql
```

## 📊 Contenido del Script

### Tablas Creadas

| Tabla | Descripción |
|-------|-------------|
| **USUARIO** | Usuarios del sistema (debe existir previamente) |
| **TARJETA** | Información de tarjetas de crédito |
| **COMPRA** | Órdenes de compra |
| **FACTURA** | Facturas de compras |
| **ECOMMERCE** | Datos del e-commerce |
| **CARRITO** | Carritos de compra de usuarios |
| **PRODUCTO** | Catálogo de productos con reseñas |
| **ITEM** | Ítems dentro de cada carrito |
| **CAMISETAS** | Detalles específicos de camisetas |
| **SHORTS** | Detalles específicos de shorts |
| **ZAPATILLAS** | Detalles específicos de zapatillas |

### Productos Incluidos

El script incluye **24 productos** en total:

- **6 Zapatillas** (NIKE, ADIDAS, PUMA) - Precios: $65,000 - $89,999
- **6 Camisetas** (NIKE, ADIDAS, PUMA) - Precios: $39,000 - $50,000
- **6 Shorts** (NIKE, ADIDAS, PUMA) - Precios: $30,000 - $37,000
- **3 Productos iniciales** (ejemplo)

### Datos de Ejemplo

**Usuario de prueba:**
- Email: admin@ecommerce.com
- RUT: 12345678-9

**E-Commerce:**
- ID: 777
- Nombre: PARGAS

**Stock:** Todos los productos tienen stock disponible

## ⭐ Reseñas de Productos

Todos los productos incluyen reseñas entre **4.5 y 4.9 estrellas**, permitiendo que la sección de "Productos Recomendados" muestre los mejores productos.

## 🔍 Verificación

Al ejecutar el script, verás dos consultas de verificación:

1. **Resumen de productos por tipo:** Muestra cantidad y precios promedio
2. **Top 10 productos recomendados:** Muestra los mejores productos ordenados por reseña

## ⚠️ Notas Importantes

- El script usa `CREATE TABLE IF NOT EXISTS`, por lo que es **seguro ejecutarlo múltiples veces**
- Los datos se insertan con `ON CONFLICT DO NOTHING`, evitando duplicados
- La tabla `USUARIO` debe existir previamente (o descomentar su creación en el script)
- El script finaliza con `COMMIT` para asegurar que todos los cambios se guarden

## 🛠️ Requisitos Previos

- PostgreSQL instalado y corriendo
- Base de datos `Ecommerce` creada
- Usuario `postgres` (o el usuario que uses) con permisos suficientes
- Tabla `USUARIO` debe existir con columna `RUT` como clave primaria

## 📝 Modificaciones Futuras

Si necesitas:

- **Agregar más productos:** Agrega más filas en las secciones `INSERT INTO PRODUCTO`
- **Cambiar reseñas:** Modifica los valores en la columna `RESEÑA`
- **Agregar imágenes:** Reemplaza las URLs en la columna `IMAGEN`
- **Cambiar precios:** Modifica los valores en la columna `PRECIO`

## ✅ Checklist de Instalación

- [ ] PostgreSQL está corriendo
- [ ] Base de datos `Ecommerce` existe
- [ ] Tabla `USUARIO` existe
- [ ] Ejecuté el script `EcommerceBD_Completa.sql`
- [ ] Las tablas se crearon correctamente
- [ ] Los datos se insertaron sin errores
- [ ] El backend está conectado a la BD
- [ ] El frontend muestra los productos recomendados

## 🆘 Solución de Problemas

**Error: "relation usuario does not exist"**
→ Primero debes crear la tabla USUARIO

**Error: "duplicate key value"**
→ Normal, el script ignora duplicados automáticamente

**No se ven los productos recomendados**
→ Asegúrate de reiniciar el backend después de ejecutar el script

---

**¡Listo para usar!** 🎉
