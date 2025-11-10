import { createContext, useContext, useState } from 'react';
type ReactNode = import('react').ReactNode;

export type ProductoCarrito = {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
};

interface CarritoContextType {
  productos: ProductoCarrito[];
  agregarProducto: (producto: ProductoCarrito) => void;
  eliminarProducto: (id: number) => void;
  actualizarCantidad: (id: number, cantidad: number) => void;
  obtenerTotal: () => number;
  obtenerCantidadTotal: () => number;
  limpiarCarrito: () => void;
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

  const actualizarCantidad = (id: number, cantidad: number) => {
    if (cantidad <= 0) {
      eliminarProducto(id);
      return;
    }
    setProductos(prev =>
      prev.map(p => p.id === id ? { ...p, cantidad } : p)
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
        limpiarCarrito 
      }}>
      {children}
    </CarritoContext.Provider>
  );
};
