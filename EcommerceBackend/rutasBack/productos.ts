import { Router, Request, Response } from 'express';
import { pool } from '../db';

const router = Router();

// Listar todos los productos
router.get('/', async (req: Request, res: Response) => {
  try {
    const { categoria, buscar, ordenar } = req.query;
    
    let query = 'SELECT * FROM PRODUCTO WHERE 1=1';
    const params: any[] = [];
    let paramCount = 1;

    // Filtrar por categoría
    if (categoria) {
      query += ` AND categoria = $${paramCount}`;
      params.push(categoria);
      paramCount++;
    }

    // Buscar por nombre o descripción
    if (buscar) {
      query += ` AND (nombre ILIKE $${paramCount} OR descripcion ILIKE $${paramCount})`;
      params.push(`%${buscar}%`);
      paramCount++;
    }

    // Ordenar fecha_creacion descendente)
    if (ordenar === 'precio_asc') {
      query += ' ORDER BY precio ASC';
    } else if (ordenar === 'precio_desc') {
      query += ' ORDER BY precio DESC';
    } else if (ordenar === 'nombre') {
      query += ' ORDER BY nombre ASC';
    } else {
      query += ' ORDER BY fecha_creacion DESC';
    }

    const result = await pool.query(query, params);

    res.json({
      success: true,
      productos: result.rows,
      total: result.rows.length
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

// Obtener producto por ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM PRODUCTO WHERE id = $1', [id]);

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

//  Filtrar por categoría
router.get('/categoria/:categoria', async (req: Request, res: Response) => {
  try {
    const { categoria } = req.params;
    const { ordenar } = req.query;

    let query = 'SELECT * FROM PRODUCTO WHERE categoria = $1';
    
    // Ordenar
    if (ordenar === 'precio_asc') {
      query += ' ORDER BY precio ASC';
    } else if (ordenar === 'precio_desc') {
      query += ' ORDER BY precio DESC';
    } else if (ordenar === 'nombre') {
      query += ' ORDER BY nombre ASC';
    } else {
      query += ' ORDER BY fecha_creacion DESC';
    }

    const result = await pool.query(query, [categoria]);

    res.json({
      success: true,
      productos: result.rows,
      categoria: categoria,
      total: result.rows.length
    });
  } catch (error: any) {
    console.error('Error al obtener productos por categoría:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener productos por categoría',
      error: error.message
    });
  }
});

// Crear nuevo producto
router.post('/', async (req: Request, res: Response) => {
  try {
    const { nombre, descripcion, precio, categoria, stock, imagen } = req.body;

    if (!nombre || !precio || !categoria) {
      return res.status(400).json({
        success: false,
        message: 'Nombre, precio y categoría son requeridos'
      });
    }

    const result = await pool.query(
      `INSERT INTO PRODUCTO (nombre, descripcion, precio, categoria, stock, imagen) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [nombre, descripcion || null, precio, categoria, stock || 0, imagen || null]
    );

    res.status(201).json({
      success: true,
      message: 'Producto creado exitosamente',
      producto: result.rows[0]
    });
  } catch (error: any) {
    console.error('Error al crear producto:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear producto',
      error: error.message
    });
  }
});

// Actualizar producto
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, categoria, stock, imagen } = req.body;

    const result = await pool.query(
      `UPDATE PRODUCTO 
       SET nombre = COALESCE($1, nombre),
           descripcion = COALESCE($2, descripcion),
           precio = COALESCE($3, precio),
           categoria = COALESCE($4, categoria),
           stock = COALESCE($5, stock),
           imagen = COALESCE($6, imagen)
       WHERE id = $7
       RETURNING *`,
      [nombre, descripcion, precio, categoria, stock, imagen, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Producto actualizado exitosamente',
      producto: result.rows[0]
    });
  } catch (error: any) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar producto',
      error: error.message
    });
  }
});

//  Eliminar producto
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM PRODUCTO WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Producto eliminado exitosamente',
      producto: result.rows[0]
    });
  } catch (error: any) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar producto',
      error: error.message
    });
  }
});

export default router;

