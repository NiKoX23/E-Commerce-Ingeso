import React, { useState } from 'react';
import './RenovarStock.css';

interface RenovarStockProps {
  onRenovar?: () => void;
}

const RenovarStock: React.FC<RenovarStockProps> = ({ onRenovar }) => {
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');

  const ADMIN_USER = 'admin';
  const ADMIN_PASSWORD = 'admin123';

  const handleAbrirModal = () => {
    setMostrarModal(true);
    setUsuario('');
    setContraseña('');
    setMensaje('');
  };

  const handleCerrarModal = () => {
    setMostrarModal(false);
    setMensaje('');
  };

  const handleValidarAdmin = async () => {
    // Validar credenciales
    if (usuario !== ADMIN_USER || contraseña !== ADMIN_PASSWORD) {
      setMensaje('❌ Usuario o contraseña incorrectos');
      return;
    }

    // Si es correcto, procesar la compra
    try {
      setCargando(true);
      setMensaje('');

      const response = await fetch('http://localhost:5000/api/productos/renovar-stock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ renovarTodos: true }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMensaje(`❌ Error: ${data.message}`);
        return;
      }

      setMensaje('✅ Stock renovado exitosamente para todos los productos');
      if (onRenovar) onRenovar();

      setTimeout(() => {
        window.location.reload(); // Recargar para ver cambios
      }, 1500);
    } catch (error) {
      console.error('Error al renovar stock:', error);
      setMensaje('❌ Error al renovar stock. Intenta de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
      {/* Botón oculto (solo visible para developer) */}
      <button
        onClick={handleAbrirModal}
        className="renovar-stock-btn-oculto"
        title="Panel de administrador"
      >
        ⚙️
      </button>

      {/* Modal de autenticación */}
      {mostrarModal && (
        <div className="renovar-stock-modal-overlay" onClick={handleCerrarModal}>
          <div className="renovar-stock-modal" onClick={(e) => e.stopPropagation()}>
            <div className="renovar-stock-modal-header">
              <h2>🔐 Panel de Administrador</h2>
              <button
                className="renovar-stock-modal-close"
                onClick={handleCerrarModal}
              >
                ✕
              </button>
            </div>

            <div className="renovar-stock-modal-body">
              <div className="renovar-stock-input-group">
                <label>Usuario:</label>
                <input
                  type="text"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  placeholder="Ingresa usuario"
                  onKeyPress={(e) => e.key === 'Enter' && handleValidarAdmin()}
                />
              </div>

              <div className="renovar-stock-input-group">
                <label>Contraseña:</label>
                <input
                  type="password"
                  value={contraseña}
                  onChange={(e) => setContraseña(e.target.value)}
                  placeholder="Ingresa contraseña"
                  onKeyPress={(e) => e.key === 'Enter' && handleValidarAdmin()}
                />
              </div>

              {mensaje && (
                <div className={`renovar-stock-mensaje ${mensaje.includes('✅') ? 'exito' : 'error'}`}>
                  {mensaje}
                </div>
              )}

              <button
                onClick={handleValidarAdmin}
                disabled={cargando}
                className="renovar-stock-modal-btn"
              >
                {cargando ? '⏳ Renovando...' : '🔄 Renovar Stock'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RenovarStock;
