const API_URL = 'http://localhost:5000/api/productos';

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: 'futbol' | 'tenis' | 'basketball' | 'boxeo' | 'running';
  stock: number;
  imagen: string;
  fecha_creacion: string;
}

export interface ProductosResponse {
  success: boolean;
  productos: Producto[];
  total: number;
  categoria?: string;
}

export interface ProductoResponse {
  success: boolean;
  producto: Producto;
  message?: string;
}

// Obtener todos los productos
export const obtenerProductos = async (params?: {
  categoria?: string;
  buscar?: string;
  ordenar?: string;
}): Promise<ProductosResponse> => {
  const queryParams = new URLSearchParams();
  if (params?.categoria) queryParams.append('categoria', params.categoria);
  if (params?.buscar) queryParams.append('buscar', params.buscar);
  if (params?.ordenar) queryParams.append('ordenar', params.ordenar);

  const url = queryParams.toString() 
    ? `${API_URL}?${queryParams.toString()}`
    : API_URL;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Error al obtener productos');
  }
  return response.json();
};

// Obtener producto por ID
export const obtenerProductoPorId = async (id: number): Promise<ProductoResponse> => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Error al obtener producto');
  }
  return response.json();
};

// Obtener productos por categoría
export const obtenerProductosPorCategoria = async (
  categoria: string,
  ordenar?: string
): Promise<ProductosResponse> => {
  const queryParams = ordenar ? `?ordenar=${ordenar}` : '';
  const response = await fetch(`${API_URL}/categoria/${categoria}${queryParams}`);
  if (!response.ok) {
    throw new Error('Error al obtener productos por categoría');
  }
  return response.json();
};

// Buscar productos
export const buscarProductos = async (termino: string): Promise<ProductosResponse> => {
  const response = await fetch(`${API_URL}?buscar=${encodeURIComponent(termino)}`);
  if (!response.ok) {
    throw new Error('Error al buscar productos');
  }
  return response.json();
};

// Crear producto (para admin)
export const crearProducto = async (producto: Partial<Producto>): Promise<ProductoResponse> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(producto),
  });
  if (!response.ok) {
    throw new Error('Error al crear producto');
  }
  return response.json();
};

// Actualizar producto (para admin)
export const actualizarProducto = async (
  id: number,
  producto: Partial<Producto>
): Promise<ProductoResponse> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(producto),
  });
  if (!response.ok) {
    throw new Error('Error al actualizar producto');
  }
  return response.json();
};

// Eliminar producto (para admin)
export const eliminarProducto = async (id: number): Promise<ProductoResponse> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Error al eliminar producto');
  }
  return response.json();
};

