import { createContext, useContext, useState } from 'react';
type ReactNode = import('react').ReactNode;

export type ProductoCarrito = {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  stockDisponible?: number; // Nuevo: para validar cantidad máxima
};

interface CarritoContextType {
  productos: ProductoCarrito[];
  agregarProducto: (producto: ProductoCarrito) => void;
  eliminarProducto: (id: number) => void;
  actualizarCantidad: (id: number, cantidad: number) => boolean; // Retorna si fue exitoso
  obtenerTotal: () => number;
  obtenerCantidadTotal: () => number;
  limpiarCarrito: () => void;
  actualizarStock: (id: number, nuevoStock: number) => void; // Nuevo: para sincronizar stock
}

const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) throw new Error('useCarrito debe usarse dentro de CarritoProvider');
  return context;
};

export const CarritoProvider = ({ children }: { children: ReactNode }) => {
  const [productos, setProductos] = useState<ProductoCarrito[]>([]);

  const agregarProducto = (producto: ProductoCarrito) => {
    setProductos(prev => {
      const existe = prev.find(p => p.id === producto.id);
      if (existe) {
        return prev.map(p => 
          p.id === producto.id 
            ? { ...p, cantidad: p.cantidad + producto.cantidad } 
            : p
        );
      }
      return [...prev, producto];
    });
  };

  const eliminarProducto = (id: number) => {
    setProductos(prev => prev.filter(p => p.id !== id));
  };

  const actualizarCantidad = (id: number, cantidad: number): boolean => {
    if (cantidad <= 0) {
      eliminarProducto(id);
      return true;
    }

    // Validar que no supere el stock disponible
    const producto = productos.find(p => p.id === id);
    if (producto && producto.stockDisponible && cantidad > producto.stockDisponible) {
      return false; // No actualizar si excede el stock
    }

    setProductos(prev =>
      prev.map(p => p.id === id ? { ...p, cantidad } : p)
    );
    return true;
  };

  const actualizarStock = (id: number, nuevoStock: number) => {
    setProductos(prev =>
      prev.map(p => p.id === id ? { ...p, stockDisponible: nuevoStock } : p)
    );
  };

  const obtenerTotal = () => {
    return productos.reduce((total, p) => total + (p.precio * p.cantidad), 0);
  };

  const obtenerCantidadTotal = () => {
    return productos.reduce((total, p) => total + p.cantidad, 0);
  };

  const limpiarCarrito = () => setProductos([]);

  return (
    <CarritoContext.Provider 
      value={{ 
        productos, 
        agregarProducto, 
        eliminarProducto,
        actualizarCantidad,
        obtenerTotal,
        obtenerCantidadTotal,
        limpiarCarrito,
        actualizarStock
      }}>
      {children}
    </CarritoContext.Provider>
  );
};
