-- Script para agregar más productos a la tabla PRODUCTO
-- Sin eliminar los existentes

-- ZAPATILLAS (tipo = ZAPATILLA)
INSERT INTO PRODUCTO (id_commerce, tipo, marca, stock, precio, descripcion, imagen) 
VALUES 
(777, 'ZAPATILLA', 'NIKE', 20, 89999.00, 'Nike Air Max 90 - Zapatilla deportiva', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop'),
(777, 'ZAPATILLA', 'ADIDAS', 25, 75000.00, 'Adidas Ultraboost 21 - Zapatilla running', 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400&h=300&fit=crop'),
(777, 'ZAPATILLA', 'PUMA', 18, 65000.00, 'Puma RS-X - Zapatilla clásica', 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=300&fit=crop'),
(777, 'ZAPATILLA', 'NIKE', 22, 85000.00, 'Nike React Infinity Run - Zapatilla running', 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=300&fit=crop'),
(777, 'ZAPATILLA', 'ADIDAS', 30, 72000.00, 'Adidas NMD R1 - Zapatilla urbana', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop'),
(777, 'ZAPATILLA', 'PUMA', 16, 68000.00, 'Puma Future Z 1.3 - Zapatilla fútbol', 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop'),

-- CAMISETAS (tipo = CAMISETA)
(777, 'CAMISETA', 'NIKE', 40, 45000.00, 'Nike Dri-FIT - Camiseta deportiva', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop'),
(777, 'CAMISETA', 'ADIDAS', 35, 42000.00, 'Adidas Climacool - Camiseta running', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop'),
(777, 'CAMISETA', 'PUMA', 30, 39000.00, 'Puma Performance - Camiseta entrenamiento', 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=300&fit=crop'),
(777, 'CAMISETA', 'NIKE', 45, 48000.00, 'Nike Academy - Camiseta fútbol', 'https://images.unsplash.com/photo-1489749798305-ed8d0d3ff602?w=400&h=300&fit=crop'),
(777, 'CAMISETA', 'ADIDAS', 38, 44000.00, 'Adidas Fitness - Camiseta gym', 'https://images.unsplash.com/photo-1617622417606-9b5dcc2c6cfe?w=400&h=300&fit=crop'),
(777, 'CAMISETA', 'PUMA', 32, 40000.00, 'Puma Training - Camiseta deportiva', 'https://images.unsplash.com/photo-1586252260582-5f1caf6f0a3a?w=400&h=300&fit=crop'),

-- SHORTS (tipo = SHORT)
(777, 'SHORT', 'NIKE', 35, 35000.00, 'Nike Dri-FIT - Short deportivo', 'https://images.unsplash.com/photo-1574701148212-ce2d0b0a0ee1?w=400&h=300&fit=crop'),
(777, 'SHORT', 'ADIDAS', 40, 32000.00, 'Adidas Climalite - Short running', 'https://images.unsplash.com/photo-1506629082632-a8c1a11d718f?w=400&h=300&fit=crop'),
(777, 'SHORT', 'PUMA', 28, 30000.00, 'Puma Active - Short entrenamiento', 'https://images.unsplash.com/photo-1506629082632-a8c1a11d718f?w=400&h=300&fit=crop'),
(777, 'SHORT', 'NIKE', 42, 37000.00, 'Nike Academy - Short fútbol', 'https://images.unsplash.com/photo-1574701148212-ce2d0b0a0ee1?w=400&h=300&fit=crop'),
(777, 'SHORT', 'ADIDAS', 38, 33000.00, 'Adidas Fitness - Short gym', 'https://images.unsplash.com/photo-1506629082632-a8c1a11d718f?w=400&h=300&fit=crop'),
(777, 'SHORT', 'PUMA', 25, 31000.00, 'Puma Training - Short deportivo', 'https://images.unsplash.com/photo-1574701148212-ce2d0b0a0ee1?w=400&h=300&fit=crop')
ON CONFLICT DO NOTHING;

-- Verificar que se agregaron correctamente
SELECT tipo, COUNT(*) as cantidad, AVG(precio) as precio_promedio 
FROM PRODUCTO 
GROUP BY tipo;
