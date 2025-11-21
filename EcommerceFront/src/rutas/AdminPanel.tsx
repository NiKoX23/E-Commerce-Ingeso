import { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Chart } from 'primereact/chart';
import { useNavigate } from 'react-router-dom';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
  categoria: string;
  marca: string;
  imagen?: string;
  descripcion?: string;
}

interface Stats {
  porCategoria: Array<{
    categoria: string;
    cantidad: number;
    stock_total: number;
    precio_promedio: number;
  }>;
  porMarca: Array<{
    marca: string;
    cantidad: number;
    stock_total: number;
    valor_inventario: number;
  }>;
  bajoStock: Array<{
    id: number;
    nombre: string;
    marca: string;
    stock: number;
  }>;
}

export default function AdminPanel() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [displayDialog, setDisplayDialog] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState<Producto | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
      return;
    }
    
    const userData = JSON.parse(user);
    if (!userData.isAdmin) {
      navigate('/dashboard');
      return;
    }

    cargarProductos();
    cargarEstadisticas();
  }, [navigate]);

  const cargarProductos = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/todos');
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  };

  const cargarEstadisticas = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/todos/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
    }
  };

  const openNew = () => {
    setSelectedProducto({
      id: 0,
      nombre: '',
      precio: 0,
      stock: 0,
      categoria: '',
      marca: '',
      imagen: ''
    });
    setIsEditing(false);
    setDisplayDialog(true);
  };

  const editProducto = (producto: Producto) => {
    setSelectedProducto({ ...producto });
    setIsEditing(true);
    setDisplayDialog(true);
  };

  const deleteProducto = async (producto: Producto) => {
    if (confirm(`¿Está seguro de eliminar ${producto.nombre}?`)) {
      try {
        // Aquí deberías implementar el endpoint de eliminación en el backend
        console.log('Eliminar producto:', producto.id);
        await cargarProductos();
      } catch (error) {
        console.error('Error al eliminar producto:', error);
      }
    }
  };

  const saveProducto = async () => {
    if (!selectedProducto) return;

    try {
      // Aquí deberías implementar el endpoint de crear/actualizar en el backend
      console.log(isEditing ? 'Actualizar' : 'Crear', selectedProducto);
      setDisplayDialog(false);
      await cargarProductos();
    } catch (error) {
      console.error('Error al guardar producto:', error);
    }
  };

  const hideDialog = () => {
    setDisplayDialog(false);
    setSelectedProducto(null);
  };

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const actionBodyTemplate = (rowData: Producto) => {
    return (
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Button 
          icon="pi pi-pencil" 
          className="p-button-rounded p-button-success" 
          onClick={() => editProducto(rowData)} 
        />
        <Button 
          icon="pi pi-trash" 
          className="p-button-rounded p-button-danger" 
          onClick={() => deleteProducto(rowData)} 
        />
      </div>
    );
  };

  const dialogFooter = (
    <div>
      <Button label="Cancelar" icon="pi pi-times" onClick={hideDialog} className="p-button-text" />
      <Button label="Guardar" icon="pi pi-check" onClick={saveProducto} />
    </div>
  );

  // Configuración de gráficos
  const chartOptionsBar = {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      legend: {
        labels: {
          color: '#495057'
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#495057'
        },
        grid: {
          color: '#ebedef'
        }
      },
      y: {
        ticks: {
          color: '#495057'
        },
        grid: {
          color: '#ebedef'
        }
      }
    }
  };

  const chartOptionsPie = {
    plugins: {
      legend: {
        labels: {
          color: '#495057'
        }
      }
    }
  };

  // Datos para gráfico de barras (Stock por categoría)
  const chartDataStock = stats ? {
    labels: stats.porCategoria.map(c => c.categoria),
    datasets: [
      {
        label: 'Stock Total',
        backgroundColor: '#42A5F5',
        borderColor: '#1E88E5',
        data: stats.porCategoria.map(c => c.stock_total)
      }
    ]
  } : null;

  // Datos para gráfico de pie (Valor de inventario por marca)
  const chartDataInventario = stats ? {
    labels: stats.porMarca.map(m => m.marca),
    datasets: [
      {
        data: stats.porMarca.map(m => Math.round(m.valor_inventario)),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ]
      }
    ]
  } : null;

  return (
    <div style={{
      minHeight: '100vh',
      padding: '2rem',
      background: 'linear-gradient(135deg, #1a1a1a, #2d2d2d)',
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <Card 
          title="Panel de Administrador"
          style={{ marginBottom: '2rem' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>Gestión de Productos</h2>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Button 
                label="Nuevo Producto" 
                icon="pi pi-plus" 
                className="p-button-success" 
                onClick={openNew} 
              />
              <Button 
                label="Volver al Dashboard" 
                icon="pi pi-home" 
                onClick={() => navigate('/dashboard')} 
              />
              <Button 
                label="Cerrar Sesión" 
                icon="pi pi-sign-out" 
                className="p-button-danger" 
                onClick={logout} 
              />
            </div>
          </div>
        </Card>

        {/* Gráficos de estadísticas */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          <Card title="Stock por Categoría" style={{ height: '400px' }}>
            {chartDataStock && (
              <Chart type="bar" data={chartDataStock} options={chartOptionsBar} style={{ height: '300px' }} />
            )}
          </Card>
          
          <Card title="Valor de Inventario por Marca" style={{ height: '400px' }}>
            {chartDataInventario && (
              <Chart type="pie" data={chartDataInventario} options={chartOptionsPie} style={{ height: '300px' }} />
            )}
          </Card>
        </div>

        {/* Productos con bajo stock */}
        {stats && stats.bajoStock.length > 0 && (
          <Card title="⚠️ Productos con Bajo Stock (< 20 unidades)" style={{ marginBottom: '2rem', backgroundColor: '#fff3cd' }}>
            <DataTable value={stats.bajoStock} responsiveLayout="scroll">
              <Column field="id" header="ID" style={{ width: '10%' }} />
              <Column field="nombre" header="Nombre" style={{ width: '40%' }} />
              <Column field="marca" header="Marca" style={{ width: '30%' }} />
              <Column field="stock" header="Stock" style={{ width: '20%' }} 
                body={(rowData) => (
                  <span style={{ color: rowData.stock < 10 ? '#d32f2f' : '#f57c00', fontWeight: 'bold' }}>
                    {rowData.stock}
                  </span>
                )}
              />
            </DataTable>
          </Card>
        )}

        <Card>
          <DataTable 
            value={productos} 
            paginator 
            rows={10} 
            dataKey="id"
            responsiveLayout="scroll"
          >
            <Column field="id" header="ID" sortable style={{ width: '5%' }} />
            <Column field="nombre" header="Nombre" sortable style={{ width: '20%' }} />
            <Column field="marca" header="Marca" sortable style={{ width: '15%' }} />
            <Column field="categoria" header="Categoría" sortable style={{ width: '15%' }} />
            <Column field="precio" header="Precio" sortable style={{ width: '10%' }} 
              body={(rowData) => `$${rowData.precio.toLocaleString()}`} 
            />
            <Column field="stock" header="Stock" sortable style={{ width: '10%' }} />
            <Column header="Acciones" body={actionBodyTemplate} style={{ width: '15%' }} />
          </DataTable>
        </Card>

        <Dialog 
          visible={displayDialog} 
          style={{ width: '450px' }} 
          header={isEditing ? 'Editar Producto' : 'Nuevo Producto'} 
          modal 
          footer={dialogFooter} 
          onHide={hideDialog}
        >
          <div className="p-fluid" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="p-field">
              <label htmlFor="nombre">Nombre</label>
              <InputText 
                id="nombre" 
                value={selectedProducto?.nombre || ''} 
                onChange={(e) => setSelectedProducto(prev => prev ? { ...prev, nombre: e.target.value } : null)} 
              />
            </div>
            
            <div className="p-field">
              <label htmlFor="marca">Marca</label>
              <InputText 
                id="marca" 
                value={selectedProducto?.marca || ''} 
                onChange={(e) => setSelectedProducto(prev => prev ? { ...prev, marca: e.target.value } : null)} 
              />
            </div>

            <div className="p-field">
              <label htmlFor="categoria">Categoría</label>
              <Dropdown 
                id="categoria" 
                value={selectedProducto?.categoria || ''} 
                options={[
                  { label: 'Zapatillas', value: 'ZAPATILLA' },
                  { label: 'Camisetas', value: 'CAMISETA' },
                  { label: 'Shorts', value: 'SHORT' }
                ]}
                onChange={(e) => setSelectedProducto(prev => prev ? { ...prev, categoria: e.value } : null)} 
                placeholder="Seleccione una categoría"
              />
            </div>

            <div className="p-field">
              <label htmlFor="precio">Precio</label>
              <InputNumber 
                id="precio" 
                value={selectedProducto?.precio || 0} 
                onValueChange={(e) => setSelectedProducto(prev => prev ? { ...prev, precio: e.value || 0 } : null)} 
                mode="currency" 
                currency="CLP" 
                locale="es-CL"
              />
            </div>

            <div className="p-field">
              <label htmlFor="stock">Stock</label>
              <InputNumber 
                id="stock" 
                value={selectedProducto?.stock || 0} 
                onValueChange={(e) => setSelectedProducto(prev => prev ? { ...prev, stock: e.value || 0 } : null)} 
              />
            </div>

            <div className="p-field">
              <label htmlFor="imagen">URL de Imagen</label>
              <InputText 
                id="imagen" 
                value={selectedProducto?.imagen || ''} 
                onChange={(e) => setSelectedProducto(prev => prev ? { ...prev, imagen: e.target.value } : null)} 
              />
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
}
