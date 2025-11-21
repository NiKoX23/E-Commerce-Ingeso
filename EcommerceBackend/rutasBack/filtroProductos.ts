import { Router, Request, Response } from "express";
import { pool } from "../db";

const router = Router();

// Obtener todos los productos
router.get("/", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `SELECT 
        p.id_producto,
        CASE 
          WHEN p.tipo = 'ZAPATILLA' AND z.modelo IS NOT NULL THEN p.marca || ' ' || z.modelo
          WHEN p.tipo = 'CAMISETA' AND c.numero IS NOT NULL THEN p.marca || ' Camiseta #' || c.numero || ' ' || c.equipo
          WHEN p.tipo = 'SHORT' AND s.equipo IS NOT NULL THEN p.marca || ' Short ' || s.equipo
          ELSE p.descripcion
        END as descripcion,
        p.marca,
        p.tipo,
        p.stock,
        p.precio,
        p.imagen,
        p.reseña,
        p.id_commerce
      FROM producto p
      LEFT JOIN zapatillas z ON p.id_producto = z.id_producto AND p.tipo = 'ZAPATILLA'
      LEFT JOIN camisetas c ON p.id_producto = c.id_producto AND p.tipo = 'CAMISETA'
      LEFT JOIN shorts s ON p.id_producto = s.id_producto AND p.tipo = 'SHORT'
      ORDER BY p.id_producto`
    );
    res.json({
      success: true,
      productos: result.rows
    });
  } catch (error: any) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener productos',
      error: error.message
    });
  }
});

// Obtener productos por categoría/tipo
router.get("/categoria/:tipo", async (req: Request, res: Response) => {
  try {
    const { tipo } = req.params;
    
    // Validar que el tipo sea válido
    const tiposValidos = ['CAMISETA', 'SHORT', 'ZAPATILLA'];
    const tipoUpper = tipo.toUpperCase();
    
    if (!tiposValidos.includes(tipoUpper)) {
      return res.status(400).json({
        success: false,
        message: `Categoría inválida. Use: ${tiposValidos.join(', ')}`
      });
    }

    const result = await pool.query(
      `SELECT 
        p.id_producto,
        CASE 
          WHEN p.tipo = 'ZAPATILLA' AND z.modelo IS NOT NULL THEN p.marca || ' ' || z.modelo
          WHEN p.tipo = 'CAMISETA' AND c.numero IS NOT NULL THEN p.marca || ' Camiseta #' || c.numero || ' ' || c.equipo
          WHEN p.tipo = 'SHORT' AND s.equipo IS NOT NULL THEN p.marca || ' Short ' || s.equipo
          ELSE p.descripcion
        END as descripcion,
        p.marca,
        p.tipo,
        p.stock,
        p.precio,
        p.imagen,
        p.reseña,
        p.id_commerce
      FROM producto p
      LEFT JOIN zapatillas z ON p.id_producto = z.id_producto AND p.tipo = 'ZAPATILLA'
      LEFT JOIN camisetas c ON p.id_producto = c.id_producto AND p.tipo = 'CAMISETA'
      LEFT JOIN shorts s ON p.id_producto = s.id_producto AND p.tipo = 'SHORT'
      WHERE p.tipo = $1
      ORDER BY p.precio`,
      [tipoUpper]
    );

    res.json({
      success: true,
      categoria: tipoUpper,
      cantidad: result.rows.length,
      productos: result.rows
    });
  } catch (error: any) {
    console.error('Error al obtener productos por categoría:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener productos',
      error: error.message
    });
  }
});

// Obtener producto por ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT 
        p.id_producto,
        CASE 
          WHEN p.tipo = 'ZAPATILLA' AND z.modelo IS NOT NULL THEN p.marca || ' ' || z.modelo
          WHEN p.tipo = 'CAMISETA' AND c.numero IS NOT NULL THEN p.marca || ' Camiseta #' || c.numero || ' ' || c.equipo
          WHEN p.tipo = 'SHORT' AND s.equipo IS NOT NULL THEN p.marca || ' Short ' || s.equipo
          ELSE p.descripcion
        END as descripcion,
        p.marca,
        p.tipo,
        p.stock,
        p.precio,
        p.imagen,
        p.reseña,
        p.id_commerce
      FROM producto p
      LEFT JOIN zapatillas z ON p.id_producto = z.id_producto AND p.tipo = 'ZAPATILLA'
      LEFT JOIN camisetas c ON p.id_producto = c.id_producto AND p.tipo = 'CAMISETA'
      LEFT JOIN shorts s ON p.id_producto = s.id_producto AND p.tipo = 'SHORT'
      WHERE p.id_producto = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    res.json({
      success: true,
      producto: result.rows[0]
    });
  } catch (error: any) {
    console.error('Error al obtener producto:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener producto',
      error: error.message
    });
  }
});

// Procesar compra y actualizar stock
router.post("/procesar-compra", async (req: Request, res: Response) => {
  try {
    const { productos } = req.body;

    if (!Array.isArray(productos) || productos.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Debe proporcionar una lista de productos'
      });
    }

    // Validar stock antes de procesar
    for (const prod of productos) {
      const result = await pool.query(
        "SELECT stock FROM PRODUCTO WHERE ID_PRODUCTO = $1",
        [prod.id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: `Producto con ID ${prod.id} no encontrado`
        });
      }

      const stockDisponible = result.rows[0].stock;
      if (stockDisponible < prod.cantidad) {
        return res.status(400).json({
          success: false,
          message: `Stock insuficiente para producto ID ${prod.id}. Disponible: ${stockDisponible}, Solicitado: ${prod.cantidad}`
        });
      }
    }

    // Actualizar stock para cada producto
    for (const prod of productos) {
      await pool.query(
        "UPDATE PRODUCTO SET stock = stock - $1 WHERE ID_PRODUCTO = $2",
        [prod.cantidad, prod.id]
      );
    }

    res.json({
      success: true,
      message: 'Compra procesada exitosamente',
      productosActualizados: productos.length
    });
  } catch (error: any) {
    console.error('Error al procesar compra:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al procesar compra',
      error: error.message
    });
  }
});

// Renovar stock de un producto o todos
router.post("/renovar-stock", async (req: Request, res: Response) => {
  try {
    const { id_producto, nuevoStock, renovarTodos } = req.body;

    if (renovarTodos) {
      // Renovar todos los productos a su stock inicial
      await pool.query(`
        UPDATE PRODUCTO SET stock = CASE
          WHEN tipo = 'ZAPATILLA' THEN 20
          WHEN tipo = 'CAMISETA' THEN 15
          WHEN tipo = 'SHORT' THEN 12
          ELSE 10
        END
      `);

      res.json({
        success: true,
        message: 'Stock renovado para todos los productos'
      });
    } else if (id_producto && nuevoStock) {
      // Renovar un producto específico
      const result = await pool.query(
        "UPDATE PRODUCTO SET stock = $1 WHERE ID_PRODUCTO = $2 RETURNING *",
        [nuevoStock, id_producto]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Producto no encontrado'
        });
      }
          
      res.json({
        success: true,
        message: 'Stock renovado correctamente',
        producto: result.rows[0]
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Debe proporcionar id_producto y nuevoStock, o renovarTodos: true'
      });
    }
  } catch (error: any) {
    console.error('Error al renovar stock:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al renovar stock',
      error: error.message
    });
  }
});

export default router;
