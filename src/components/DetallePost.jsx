import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function DetallePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`/api/posts/${id}`).then(r => r.json()),
      fetch(`/api/users`).then(r => r.json())
    ]).then(([postData, usersData]) => {
      setPost(postData);
      setUsuario(usersData.find(u => u.id === postData.userId));
      setCargando(false);
    });
  }, [id]);

  const handleEliminar = async () => {
    if (window.confirm('¿Eliminar post?')) {
      await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      navigate('/');
    }
  };

  if (cargando) return <div className="spinner-container"><div className="spinner"></div></div>;
  if (!post || !usuario) return <div>No encontrado</div>;

  return (
    <div>
      <button onClick={() => navigate('/')} className="btn-volver">← Volver</button>
      
      <div className="detalle-card">
        <h1>{post.title}</h1>

        <div className="usuario-info-card">
          <h3>👤 Autor</h3>
          <p><strong>Nombre:</strong> {usuario.name}</p>
          <p><strong>Email:</strong> {usuario.email}</p>
          <p><strong>Teléfono:</strong> {usuario.phone}</p>
          <p><strong>Ciudad:</strong> {usuario.address.city}</p>
          <p><strong>Compañía:</strong> {usuario.company.name}</p>
          <p><strong>Web:</strong> {usuario.website}</p>
        </div>

        <div className="detalle-body">
          <h3>📄 Contenido</h3>
          <p>{post.body}</p>
        </div>

        <div className="detalle-acciones">
          <button onClick={() => navigate(`/posts/${id}/edit`)} className="btn-editar">
            ✏️ Editar
          </button>
          <button onClick={handleEliminar} className="btn-eliminar">
            🗑️ Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetallePost;