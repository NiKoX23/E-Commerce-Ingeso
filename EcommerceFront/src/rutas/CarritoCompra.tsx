import { useNavigate } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import './CarritoCompra.css';

const CarritoCompra = () => {
  const navigate = useNavigate();
  const { productos, eliminarProducto, actualizarCantidad, obtenerTotal, obtenerCantidadTotal, limpiarCarrito } = useCarrito();

  const handleDisminuir = (id: number, cantidadActual: number) => {
    if (cantidadActual > 1) {
      actualizarCantidad(id, cantidadActual - 1);
    }
  };

  const handleAumentar = (id: number, cantidadActual: number) => {
    const producto = productos.find(p => p.id === id);
    if (producto && producto.stockDisponible && cantidadActual >= producto.stockDisponible) {
      alert(`No puedes agregar más. Stock disponible: ${producto.stockDisponible}`);
      return;
    }
    actualizarCantidad(id, cantidadActual + 1);
  };

  const handleComprar = async () => {
    if (productos.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    try {
      // Enviar compra al backend para actualizar stock
      const response = await fetch('http://localhost:5000/api/productos/procesar-compra', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productos: productos.map(p => ({
            id: p.id,
            cantidad: p.cantidad,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(`Error: ${data.message}`);
        return;
      }

      alert(`¡Compra realizada exitosamente! Total: $${obtenerTotal().toLocaleString('es-CL', { minimumFractionDigits: 2 })}`);
      limpiarCarrito();
      navigate('/dashboard');
    } catch (error) {
      console.error('Error al procesar compra:', error);
      alert('Error al procesar la compra. Intenta de nuevo.');
    }
  };

  return (
    <div className="carrito-compra-container">
      <div className="carrito-compra-header">
        <button className="carrito-compra-volver" onClick={() => navigate(-1)}>← Volver</button>
      </div>
      
      <h2 className="carrito-compra-title">Mi carrito 🛒</h2>
      
      <div className="carrito-compra-list">
        {productos.length === 0 ? (
          <p className="carrito-compra-vacio">Tu carrito está vacío</p>
        ) : (
          productos.map((prod) => (
            <div className="carrito-compra-item" key={prod.id}>
              <div className="carrito-item-info">
                <span className="carrito-compra-nombre">{prod.nombre}</span>
                <span className="carrito-compra-precio">${(typeof prod.precio === 'number' ? prod.precio : parseFloat(prod.precio as any) || 0).toLocaleString('es-CL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              
              <div className="carrito-item-cantidad">
                <button 
                  className="carrito-btn-cantidad"
                  onClick={() => handleDisminuir(prod.id, prod.cantidad)}
                >
                  −
                </button>
                <span className="carrito-cantidad-valor">{prod.cantidad}</span>
                <button 
                  className="carrito-btn-cantidad"
                  onClick={() => handleAumentar(prod.id, prod.cantidad)}
                  disabled={prod.stockDisponible ? prod.cantidad >= prod.stockDisponible : false}
                  title={prod.stockDisponible ? `Stock máximo: ${prod.stockDisponible}` : ''}
                  style={{
                    opacity: prod.stockDisponible && prod.cantidad >= prod.stockDisponible ? 0.5 : 1,
                    cursor: prod.stockDisponible && prod.cantidad >= prod.stockDisponible ? 'not-allowed' : 'pointer',
                  }}
                >
                  +
                </button>
              </div>

              <span className="carrito-subtotal">
                ${((typeof prod.precio === 'number' ? prod.precio : parseFloat(prod.precio as any) || 0) * prod.cantidad).toLocaleString('es-CL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              
              <button 
                className="carrito-btn-eliminar"
                onClick={() => eliminarProducto(prod.id)}
                title="Eliminar producto"
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>

      {productos.length > 0 && (
        <div className="carrito-compra-resumen">
          <div className="carrito-resumen-fila">
            <span>Cantidad de items:</span>
            <span className="carrito-resumen-valor">{obtenerCantidadTotal()}</span>
          </div>
          <div className="carrito-resumen-fila carrito-resumen-total">
            <span>Total:</span>
            <span className="carrito-resumen-valor">${obtenerTotal().toFixed(2)}</span>
          </div>
        </div>
      )}

      <div className="carrito-compra-footer">
        <button 
          className="carrito-compra-limpiar" 
          onClick={limpiarCarrito}
          disabled={productos.length === 0}
        >
          Limpiar carrito
        </button>
        <button 
          className="carrito-compra-procesar"
          onClick={handleComprar}
          disabled={productos.length === 0}
        >
          Procesar compra
        </button>
      </div>
    </div>
  );
};

export default CarritoCompra;
