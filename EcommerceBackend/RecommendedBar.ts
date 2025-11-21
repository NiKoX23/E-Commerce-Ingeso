import { Router } from 'express';
import { pool } from './db';

const router = Router();

// Obtener productos recomendados desde la BD
router.get('/recommended', async (req, res) => {
  try {
    // Obtener 10 productos aleatorios ordenados por reseña descendente
    const result = await pool.query(
      `SELECT 
        p.id_producto as id,
        CASE 
          WHEN p.tipo = 'ZAPATILLA' AND z.modelo IS NOT NULL THEN p.marca || ' ' || z.modelo
          WHEN p.tipo = 'CAMISETA' AND c.numero IS NOT NULL THEN p.marca || ' Camiseta #' || c.numero || ' ' || c.equipo
          WHEN p.tipo = 'SHORT' AND s.equipo IS NOT NULL THEN p.marca || ' Short ' || s.equipo
          ELSE p.descripcion
        END as nombre,
        p.marca,
        p.tipo as categoria,
        p.stock,
        p.precio,
        p.descripcion,
        p.imagen,
        p.reseña
      FROM producto p
      LEFT JOIN zapatillas z ON p.id_producto = z.id_producto AND p.tipo = 'ZAPATILLA'
      LEFT JOIN camisetas c ON p.id_producto = c.id_producto AND p.tipo = 'CAMISETA'
      LEFT JOIN shorts s ON p.id_producto = s.id_producto AND p.tipo = 'SHORT'
      WHERE p.stock > 0
      ORDER BY p.reseña DESC, RANDOM() 
      LIMIT 10`
    );

    console.log('Productos recomendados obtenidos:', result.rows);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener productos recomendados:', error);
    res.status(500).json({ error: 'Error al obtener productos recomendados', details: String(error) });
  }
});

export default router;
