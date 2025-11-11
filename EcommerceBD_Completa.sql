-- ============================================================================
-- SCRIPT COMPLETO DE BASE DE DATOS E-COMMERCE
-- ============================================================================
-- Este script contiene:
-- 1. Creación de todas las tablas
-- 2. Inserción de datos iniciales
-- 3. Configuración de reseñas y productos recomendados
-- 
-- Uso: psql -U usuario -d nombre_bd -f EcommerceBD_Completa.sql
-- ============================================================================

-- ============================================================================
-- CREACIÓN DE TABLA USUARIO (si no existe, crearla primero)
-- ============================================================================
-- Asumiendo que ya existe la tabla USUARIO, si no, descomentar lo siguiente:
-- CREATE TABLE USUARIO(
--     RUT VARCHAR(15) PRIMARY KEY,
--     NOMBRE VARCHAR(100) NOT NULL,
--     EMAIL VARCHAR(100) UNIQUE NOT NULL,
--     PASSWORD_HASH TEXT NOT NULL,
--     CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- ============================================================================
-- CREACIÓN DE TABLAS
-- ============================================================================

CREATE TABLE IF NOT EXISTS TARJETA(
	NUMERO VARCHAR(16) PRIMARY KEY,
	RUT_USUARIO VARCHAR(15) NOT NULL,
	CVV INT NOT NULL,
	NOMBRE_TITULAR TEXT,
	FOREIGN KEY (RUT_USUARIO) REFERENCES USUARIO(RUT)
);

CREATE TABLE IF NOT EXISTS COMPRA(
 ID_COMPRA INT PRIMARY KEY,
 RUT_USUARIO VARCHAR(15) NOT NULL,
 MONTO INT NOT NULL,
 FOREIGN KEY (RUT_USUARIO) REFERENCES USUARIO(RUT)
);

CREATE TABLE IF NOT EXISTS FACTURA(
	ID_FACTURA INT PRIMARY KEY,
	COMPRA INT NOT NULL,
	RUT_USUARIO VARCHAR(15) NOT NULL,
	FECHA TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	MONTO_TOTAL INT NOT NULL,
	ESTADO TEXT NOT NULL,
	FOREIGN KEY (COMPRA) REFERENCES COMPRA(ID_COMPRA),
	FOREIGN KEY (RUT_USUARIO) REFERENCES USUARIO(RUT)
);

CREATE TABLE IF NOT EXISTS ECOMMERCE(
	ID_E INT PRIMARY KEY,
	COMPRA INT NOT NULL,
	NOMBRE VARCHAR(20) NOT NULL,
	FOREIGN KEY (COMPRA) REFERENCES COMPRA(ID_COMPRA)
);

CREATE TABLE IF NOT EXISTS CARRITO(
	ID_CARRO INT PRIMARY KEY,
	RUT_USUARIO VARCHAR(15) NOT NULL,
	FECHA_USO TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (RUT_USUARIO) REFERENCES USUARIO(RUT)
);

CREATE TABLE IF NOT EXISTS PRODUCTO(
	ID_PRODUCTO INT PRIMARY KEY,
	ID_COMMERCE INT NOT NULL,
	TIPO TEXT NOT NULL,
	MARCA VARCHAR(20) NOT NULL,
	STOCK INT NOT NULL,
	PRECIO NUMERIC NOT NULL,
	DESCRIPCION TEXT DEFAULT 'Producto de calidad',
	IMAGEN VARCHAR(500) DEFAULT 'https://via.placeholder.com/110x110/cccccc/cccccc',
	RESEÑA DECIMAL(3,1) DEFAULT 4.5,
	FOREIGN KEY (ID_COMMERCE) REFERENCES ECOMMERCE(ID_E)
);

CREATE TABLE IF NOT EXISTS ITEM(
	ID_ITEM INT PRIMARY KEY,
	ID_CARRITO INT NOT NULL,
	ID_PROD INT NOT NULL,
	CAPACIDAD INT NOT NULL,
	FOREIGN KEY (ID_PROD) REFERENCES PRODUCTO(ID_PRODUCTO),
	FOREIGN KEY (ID_CARRITO) REFERENCES CARRITO(ID_CARRO)
);

CREATE TABLE IF NOT EXISTS CAMISETAS(
	ID_PRODUCTO INT PRIMARY KEY REFERENCES PRODUCTO(ID_PRODUCTO),
	NUMERO INT NOT NULL,
	TALLA VARCHAR(6) NOT NULL,
	EQUIPO VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS SHORTS(
	ID_PRODUCTO INT PRIMARY KEY REFERENCES PRODUCTO(ID_PRODUCTO),
	TALLA VARCHAR(6) NOT NULL,
	EQUIPO VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS ZAPATILLAS(
	ID_PRODUCTO INT PRIMARY KEY REFERENCES PRODUCTO(ID_PRODUCTO),
	MODELO VARCHAR(35) NOT NULL,
	TALLA FLOAT NOT NULL
);

-- ============================================================================
-- INSERCIÓN DE DATOS INICIALES
-- ============================================================================

-- Insertar Tarjeta
INSERT INTO TARJETA(NUMERO, RUT_USUARIO, CVV, NOMBRE_TITULAR)
VALUES(123412341234, '12345678-9', 123, 'Usuario')
ON CONFLICT DO NOTHING;

-- Insertar Carrito
INSERT INTO CARRITO(ID_CARRO, RUT_USUARIO)
VALUES(1, '12345678-9')
ON CONFLICT DO NOTHING;

-- Insertar Compra
INSERT INTO COMPRA(ID_COMPRA, RUT_USUARIO, MONTO)
VALUES(1, '12345678-9', 10000)
ON CONFLICT DO NOTHING;

-- Insertar E-Commerce
INSERT INTO ECOMMERCE(ID_E, COMPRA, NOMBRE)
VALUES(777, 1, 'PARGAS')
ON CONFLICT DO NOTHING;

-- Insertar Factura
INSERT INTO FACTURA(ID_FACTURA, COMPRA, RUT_USUARIO, MONTO_TOTAL, ESTADO)
VALUES(1, 1, '12345678-9', 10000, 'PAGADO')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- INSERCIÓN DE PRODUCTOS INICIALES (con reseñas y descripciones)
-- ============================================================================

INSERT INTO PRODUCTO(ID_PRODUCTO, ID_COMMERCE, TIPO, MARCA, STOCK, PRECIO, DESCRIPCION, IMAGEN, RESEÑA)
VALUES
(1, 777, 'CAMISETA', 'NIKE', 50, 50000, 'Camiseta deportiva Nike clásica', '', 4.5),
(2, 777, 'SHORT', 'ADIDAS', 25, 30000, 'Short deportivo Adidas cómodo', '', 4.6),
(3, 777, 'ZAPATILLA', 'PUMA', 15, 42000, 'Zapatilla Puma Mercurial', '', 4.7)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- INSERCIÓN DE PRODUCTOS ADICIONALES - ZAPATILLAS
-- ============================================================================

INSERT INTO PRODUCTO(ID_COMMERCE, TIPO, MARCA, STOCK, PRECIO, DESCRIPCION, IMAGEN, RESEÑA)
VALUES
(777, 'ZAPATILLA', 'NIKE', 20, 89999.00, 'Nike Air Max 90 - Zapatilla deportiva', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop', 4.8),
(777, 'ZAPATILLA', 'ADIDAS', 25, 75000.00, 'Adidas Ultraboost 21 - Zapatilla running', 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400&h=300&fit=crop', 4.9),
(777, 'ZAPATILLA', 'PUMA', 18, 65000.00, 'Puma RS-X - Zapatilla clásica', 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=300&fit=crop', 4.7),
(777, 'ZAPATILLA', 'NIKE', 22, 85000.00, 'Nike React Infinity Run - Zapatilla running', 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=300&fit=crop', 4.6),
(777, 'ZAPATILLA', 'ADIDAS', 30, 72000.00, 'Adidas NMD R1 - Zapatilla urbana', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop', 4.8),
(777, 'ZAPATILLA', 'PUMA', 16, 68000.00, 'Puma Future Z 1.3 - Zapatilla fútbol', 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop', 4.5)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- INSERCIÓN DE PRODUCTOS ADICIONALES - CAMISETAS
-- ============================================================================

INSERT INTO PRODUCTO(ID_COMMERCE, TIPO, MARCA, STOCK, PRECIO, DESCRIPCION, IMAGEN, RESEÑA)
VALUES
(777, 'CAMISETA', 'NIKE', 40, 45000.00, 'Nike Dri-FIT - Camiseta deportiva', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop', 4.7),
(777, 'CAMISETA', 'ADIDAS', 35, 42000.00, 'Adidas Climacool - Camiseta running', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop', 4.8),
(777, 'CAMISETA', 'PUMA', 30, 39000.00, 'Puma Performance - Camiseta entrenamiento', 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=300&fit=crop', 4.6),
(777, 'CAMISETA', 'NIKE', 45, 48000.00, 'Nike Academy - Camiseta fútbol', 'https://images.unsplash.com/photo-1489749798305-ed8d0d3ff602?w=400&h=300&fit=crop', 4.9),
(777, 'CAMISETA', 'ADIDAS', 38, 44000.00, 'Adidas Fitness - Camiseta gym', 'https://images.unsplash.com/photo-1617622417606-9b5dcc2c6cfe?w=400&h=300&fit=crop', 4.7),
(777, 'CAMISETA', 'PUMA', 32, 40000.00, 'Puma Training - Camiseta deportiva', 'https://images.unsplash.com/photo-1586252260582-5f1caf6f0a3a?w=400&h=300&fit=crop', 4.5)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- INSERCIÓN DE PRODUCTOS ADICIONALES - SHORTS
-- ============================================================================

INSERT INTO PRODUCTO(ID_COMMERCE, TIPO, MARCA, STOCK, PRECIO, DESCRIPCION, IMAGEN, RESEÑA)
VALUES
(777, 'SHORT', 'NIKE', 35, 35000.00, 'Nike Dri-FIT - Short deportivo', 'https://images.unsplash.com/photo-1574701148212-ce2d0b0a0ee1?w=400&h=300&fit=crop', 4.8),
(777, 'SHORT', 'ADIDAS', 40, 32000.00, 'Adidas Climalite - Short running', 'https://images.unsplash.com/photo-1506629082632-a8c1a11d718f?w=400&h=300&fit=crop', 4.6),
(777, 'SHORT', 'PUMA', 28, 30000.00, 'Puma Active - Short entrenamiento', 'https://images.unsplash.com/photo-1506629082632-a8c1a11d718f?w=400&h=300&fit=crop', 4.9),
(777, 'SHORT', 'NIKE', 42, 37000.00, 'Nike Academy - Short fútbol', 'https://images.unsplash.com/photo-1574701148212-ce2d0b0a0ee1?w=400&h=300&fit=crop', 4.7),
(777, 'SHORT', 'ADIDAS', 38, 33000.00, 'Adidas Fitness - Short gym', 'https://images.unsplash.com/photo-1506629082632-a8c1a11d718f?w=400&h=300&fit=crop', 4.5),
(777, 'SHORT', 'PUMA', 25, 31000.00, 'Puma Training - Short deportivo', 'https://images.unsplash.com/photo-1574701148212-ce2d0b0a0ee1?w=400&h=300&fit=crop', 4.8)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- INSERCIÓN DE DATOS ESPECÍFICOS DE PRODUCTOS (CAMISETAS, SHORTS, ZAPATILLAS)
-- ============================================================================

INSERT INTO CAMISETAS(ID_PRODUCTO, NUMERO, TALLA, EQUIPO)
VALUES(1, 10, 'L', 'REAL MADRID')
ON CONFLICT DO NOTHING;

INSERT INTO SHORTS(ID_PRODUCTO, TALLA, EQUIPO)
VALUES(2, 'M', 'COLO-COLO')
ON CONFLICT DO NOTHING;

INSERT INTO ZAPATILLAS(ID_PRODUCTO, MODELO, TALLA)
VALUES(3, 'MERCURIAL', 42)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- INSERCIÓN DE ITEMS EN CARRITO (EJEMPLO)
-- ============================================================================

INSERT INTO ITEM(ID_ITEM, ID_CARRITO, ID_PROD, CAPACIDAD)
VALUES(1, 1, 2, 5)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- VERIFICACIÓN DE DATOS INSERTADOS
-- ============================================================================

COMMIT;

-- Mostrar resumen de productos por tipo
SELECT tipo, COUNT(*) as cantidad, AVG(precio) as precio_promedio, AVG(reseña) as reseña_promedio
FROM PRODUCTO 
GROUP BY tipo
ORDER BY tipo;

-- Mostrar productos recomendados (top 10)
SELECT ID_PRODUCTO, MARCA, TIPO, PRECIO, STOCK, RESEÑA, DESCRIPCION
FROM PRODUCTO 
WHERE STOCK > 0
ORDER BY RESEÑA DESC, RANDOM()
LIMIT 10;

-- ============================================================================
-- FIN DEL SCRIPT
-- ============================================================================
-- Script completado correctamente.
-- La base de datos está lista para usar.
-- ============================================================================
