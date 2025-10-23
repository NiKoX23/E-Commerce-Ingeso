import React, { createContext, useContext, useState } from 'react';
type ReactNode = import('react').ReactNode;

export type ProductoCarrito = {
  id: number;
  nombre: string;
  cantidad: number;
};

interface CarritoContextType {
  productos: ProductoCarrito[];
  agregarProducto: (producto: ProductoCarrito) => void;
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
        return prev.map(p => p.id === producto.id ? { ...p, cantidad: p.cantidad + producto.cantidad } : p);
      }
      return [...prev, producto];
    });
  };

  const limpiarCarrito = () => setProductos([]);

  return (
    <CarritoContext.Provider value={{ productos, agregarProducto, limpiarCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
};
