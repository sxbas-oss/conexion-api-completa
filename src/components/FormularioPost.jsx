import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function FormularioPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    title: '',
    body: '',
    userId: 1
  });

  useEffect(() => {
    if (isEditing) {
      fetch(`/api/posts/${id}`)
        .then(r => r.json())
        .then(data => setFormData(data));
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isEditing ? `/api/posts/${id}` : '/api/posts';
    const method = isEditing ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    navigate('/');
  };

  return (
    <div className="formulario-container">
      <button onClick={() => navigate('/')} className="btn-volver">← Volver</button>
      
      <div className="formulario-card">
        <h2>{isEditing ? '✏️ Editar' : '➕ Crear'} Post</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Título:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Contenido:</label>
            <textarea
              name="body"
              value={formData.body}
              onChange={handleChange}
              rows="6"
              required
            />
          </div>

          <button type="submit" className="btn-guardar">
            {isEditing ? 'Actualizar' : 'Crear'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormularioPost;