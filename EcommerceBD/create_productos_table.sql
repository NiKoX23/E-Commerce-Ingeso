-- crear la tabla PRODUCTO

CREATE TABLE IF NOT EXISTS PRODUCTO (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    categoria VARCHAR(50) NOT NULL CHECK (categoria IN ('futbol', 'tenis', 'basketball', 'boxeo', 'running')),
    stock INTEGER DEFAULT 0,
    imagen VARCHAR(500),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- índice para búsquedas por categoría
CREATE INDEX IF NOT EXISTS idx_producto_categoria ON PRODUCTO(categoria);

-- índice para búsquedas por nombre
CREATE INDEX IF NOT EXISTS idx_producto_nombre ON PRODUCTO(nombre);

-- Insertar datos de ejemplo
INSERT INTO PRODUCTO (nombre, descripcion, precio, categoria, stock, imagen) VALUES
('Balón de Fútbol Adidas', 'Balón oficial de fútbol, tamaño 5, material sintético de alta calidad', 29.99, 'futbol', 50, 'https://via.placeholder.com/300x300?text=Balon+Futbol'),
('Zapatillas Nike Air Max', 'Zapatillas deportivas con tecnología Air Max, ideales para running', 89.99, 'running', 30, 'https://via.placeholder.com/300x300?text=Zapatillas+Running'),
('Raqueta de Tenis Wilson', 'Raqueta profesional de tenis, peso ligero, perfecta para jugadores intermedios', 129.99, 'tenis', 25, 'https://via.placeholder.com/300x300?text=Raqueta+Tenis'),
('Balón de Basketball Spalding', 'Balón oficial de basketball, tamaño 7, material de cuero sintético', 34.99, 'basketball', 40, 'https://via.placeholder.com/300x300?text=Balon+Basketball'),
('Guantes de Boxeo Everlast', 'Guantes de boxeo profesionales, peso 16oz, ideal para entrenamiento', 49.99, 'boxeo', 35, 'https://via.placeholder.com/300x300?text=Guantes+Boxeo'),
('Camiseta de Fútbol Nike', 'Camiseta oficial de fútbol, 100% poliéster, tecnología Dri-FIT', 39.99, 'futbol', 60, 'https://via.placeholder.com/300x300?text=Camiseta+Futbol'),
('Shorts Running Adidas', 'Shorts deportivos para running, material transpirable, cómodos', 24.99, 'running', 45, 'https://via.placeholder.com/300x300?text=Shorts+Running'),
('Pelotas de Tenis Wilson', 'Pack de 3 pelotas de tenis profesionales, presión óptima', 12.99, 'tenis', 100, 'https://via.placeholder.com/300x300?text=Pelotas+Tenis'),
('Canasta Basketball Portátil', 'Canasta de basketball portátil, altura regulable, ideal para exteriores', 199.99, 'basketball', 15, 'https://via.placeholder.com/300x300?text=Canasta+Basketball'),
('Protector Bucal Boxeo', 'Protector bucal profesional para boxeo, ajustable, protección máxima', 14.99, 'boxeo', 80, 'https://via.placeholder.com/300x300?text=Protector+Bucal');

-- Verificar que los datos se insertaron correctamente
SELECT COUNT(*) as total_productos FROM PRODUCTO;

