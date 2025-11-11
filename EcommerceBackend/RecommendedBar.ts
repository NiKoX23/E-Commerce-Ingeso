import { Router } from 'express';
import { pool } from './db';

const router = Router();

// Obtener productos recomendados desde la BD
router.get('/recommended', async (req, res) => {
  try {
    // Obtener 10 productos aleatorios ordenados por reseña descendente
    const result = await pool.query(
      `SELECT 
        id_producto as id, 
        tipo,
        marca,
        precio,
        stock,
        reseña,
        descripcion,
        imagen
      FROM producto 
      WHERE stock > 0
      ORDER BY reseña DESC, RANDOM() 
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
