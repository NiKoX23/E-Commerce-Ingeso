//aqui envian informacion
import { Router, Request, Response } from "express";
import { pool } from '../db';

const router = Router();

// Obtener todos los productos
router.get("/", async (req: Request, res: Response) => {
  try {
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
      ORDER BY p.id_producto`
    );

    res.json(result.rows);
  } catch (error: any) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener productos',
      error: error.message
    });
  }
});

// Obtener estadísticas para el panel de administrador
router.get("/stats", async (req: Request, res: Response) => {
  try {
    // Estadísticas por categoría
    const categoriaStats = await pool.query(
      `SELECT 
        tipo as categoria,
        COUNT(*)::int as cantidad,
        SUM(stock)::int as stock_total,
        ROUND(AVG(precio)::numeric, 2)::float as precio_promedio
      FROM producto
      GROUP BY tipo
      ORDER BY cantidad DESC`
    );

    // Estadísticas por marca
    const marcaStats = await pool.query(
      `SELECT 
        marca,
        COUNT(*)::int as cantidad,
        SUM(stock)::int as stock_total,
        ROUND(SUM(stock * precio)::numeric, 2)::float as valor_inventario
      FROM producto
      GROUP BY marca
      ORDER BY valor_inventario DESC`
    );

    // Productos con bajo stock
    const bajoStock = await pool.query(
      `SELECT 
        p.id_producto as id,
        CASE 
          WHEN p.tipo = 'ZAPATILLA' AND z.modelo IS NOT NULL THEN p.marca || ' ' || z.modelo
          WHEN p.tipo = 'CAMISETA' AND c.numero IS NOT NULL THEN p.marca || ' Camiseta #' || c.numero || ' ' || c.equipo
          WHEN p.tipo = 'SHORT' AND s.equipo IS NOT NULL THEN p.marca || ' Short ' || s.equipo
          ELSE p.descripcion
        END as nombre,
        p.marca,
        p.stock
      FROM producto p
      LEFT JOIN zapatillas z ON p.id_producto = z.id_producto AND p.tipo = 'ZAPATILLA'
      LEFT JOIN camisetas c ON p.id_producto = c.id_producto AND p.tipo = 'CAMISETA'
      LEFT JOIN shorts s ON p.id_producto = s.id_producto AND p.tipo = 'SHORT'
      WHERE p.stock < 20
      ORDER BY p.stock ASC
      LIMIT 10`
    );

    res.json({
      porCategoria: categoriaStats.rows,
      porMarca: marcaStats.rows,
      bajoStock: bajoStock.rows
    });
  } catch (error: any) {
    console.error('Error al obtener estadísticas:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener estadísticas',
      error: error.message
    });
  }
});

export default router;
