import { useState, useEffect } from 'react';

function FiltroPorUsuario({ onFilterChange }) {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const respuesta = await fetch('/api/users');
        const datos = await respuesta.json();
        setUsuarios(datos);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setCargando(false);
      }
    };
    cargarUsuarios();
  }, []);

  return (
    <div className="filtro-container">
      <div className="filtro-grupo">
        <label>🔍 Filtrar por Usuario:</label>
        <select 
          onChange={(e) => onFilterChange(e.target.value)}
          className="filtro-select"
          disabled={cargando}
        >
          <option value="">Todos los usuarios</option>
          {usuarios.map(u => (
            <option key={u.id} value={u.id}>{u.name}</option>
          ))}
        </select>
      </div>

      <div className="filtro-grupo">
        <label>🔎 Buscar:</label>
        <input
          type="text"
          placeholder="Buscar en título o contenido..."
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value);
            onFilterChange(e.target.value);
          }}
          className="filtro-input"
        />
      </div>
    </div>
  );
}

export default FiltroPorUsuario;