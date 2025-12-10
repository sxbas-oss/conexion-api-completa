import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FiltroPorUsuario from './FiltroPorUsuario';

function ListaPosts() {
  const [posts, setPosts] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(datos => {
        setPosts(datos);
        setCargando(false);
      })
      .catch(err => console.error(err));
  }, []);

  const postsFiltrados = posts.filter(post => {
    if (!isNaN(filtro) && filtro !== '') {
      return post.userId === parseInt(filtro);
    }
    if (filtro && filtro.trim() !== '') {
      const busqueda = filtro.toLowerCase();
      return post.title.toLowerCase().includes(busqueda) ||
             post.body.toLowerCase().includes(busqueda);
    }
    return true;
  });

  if (cargando) return <div className="spinner-container"><div className="spinner"></div></div>;

  return (
    <div>
      <div className="header-lista">
        <h2>📝 Posts</h2>
        <Link to="/posts/new" className="btn-crear">➕ Nuevo</Link>
      </div>

      <FiltroPorUsuario onFilterChange={setFiltro} />

      <div className="posts-grid">
        {postsFiltrados.map(post => (
          <Link to={`/posts/${post.id}`} key={post.id} className="post-card-link">
            <div className="post-card">
              <span className="post-id">#{post.id}</span>
              <h3>{post.title}</h3>
              <p>{post.body.substring(0, 100)}...</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ListaPosts;