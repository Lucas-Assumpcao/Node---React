import { Routes, Route, Link } from 'react-router-dom';
import NovoItem from './pages/NovoItem';
import ListaCatalogo from './pages/ListaCatalogo';
import EditarItens from './pages/EditarItens';

function App() {
  return (
    <div>
      <nav className="nav">
        <Link to="/">Catálogo</Link>
        <Link to="/novo">Novo Item</Link>
      </nav>

      <Routes>
        <Route path="/" element={<ListaCatalogo />} />
        <Route path="/novo" element={<NovoItem />} />
        <Route path="/editar/:id" element={<EditarItens />} />
      </Routes>
    </div>
  );
}

export default App;