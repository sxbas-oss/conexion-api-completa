import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListaPosts from './components/ListaPosts';
import DetallePost from './components/DetallePost';
import FormularioPost from './components/FormularioPost';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <h1>📝 App de Posts</h1>
          <p>CRUD Completo con React</p>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<ListaPosts />} />
            <Route path="/posts/:id" element={<DetallePost />} />
            <Route path="/posts/new" element={<FormularioPost />} />
            <Route path="/posts/:id/edit" element={<FormularioPost />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;