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
    actualizarCantidad(id, cantidadActual + 1);
  };

  const handleComprar = () => {
    if (productos.length === 0) {
      alert('El carrito está vacío');
      return;
    }
    alert(`Compra realizada. Total: $${obtenerTotal().toFixed(2)}`);
    limpiarCarrito();
    navigate('/');
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
                <span className="carrito-compra-precio">${prod.precio.toFixed(2)}</span>
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
                >
                  +
                </button>
              </div>

              <span className="carrito-subtotal">
                ${(prod.precio * prod.cantidad).toFixed(2)}
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
