import {Routes,Route ,Link} from 'react-router-dom';
import NovoItem from "./pages/NovoItem";
import ListaCatalogo from "./pages/ListaCatalogo";

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Catálogo</Link>
        <Link to="/novo">Novo Item</Link>
      </nav>

      <Routes>
        <Route path="/" element={<ListaCatalogo />} />
        <Route path="/novo" element={<NovoItem />} />
      </Routes>
    </div>
  );
}

export default App;