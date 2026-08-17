import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ListaCatalogo() {
  const [itens, setItens] = useState([]);
  const [filtroTipo, setFiltroTipo] = useState('todos');

  useEffect(() => {
    fetch('http://localhost:3000/catalogo')
      .then((resposta) => resposta.json())
      .then((dados) => setItens(dados));
  }, []);

  function handleDelete(id) {
    fetch(`http://localhost:3000/catalogo/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setItens(itens.filter((item) => item.id !== id));
      });
  }

  const itensFiltrados = itens.filter((item) => {
    if (filtroTipo === 'todos') return true;
    return item.tipo === filtroTipo;
  });

  return (
    <div className="pagina">
      <h1>Meu Catálogo</h1>
      <p className="subtitulo">Animes e livros que estou acompanhando</p>

      <div className="filtros">
        <button
          className={`filtro-btn ${filtroTipo === 'todos' ? 'ativo' : ''}`}
          onClick={() => setFiltroTipo('todos')}
        >
          Todos
        </button>
        <button
          className={`filtro-btn ${filtroTipo === 'anime' ? 'ativo' : ''}`}
          onClick={() => setFiltroTipo('anime')}
        >
          Animes
        </button>
        <button
          className={`filtro-btn ${filtroTipo === 'livro' ? 'ativo' : ''}`}
          onClick={() => setFiltroTipo('livro')}
        >
          Livros
        </button>
      </div>

      {itensFiltrados.length === 0 ? (
        <p className="vazio">Nenhum item por aqui ainda.</p>
      ) : (
        <ul className="lista">
          {itensFiltrados.map((item) => (
            <li key={item.id} className={`item tipo-${item.tipo}`}>
              <div className="item-info">
                <p className="item-titulo">{item.titulo}</p>
                <span className="item-status">{item.status}</span>
              </div>
              <div className="item-acoes">
                <Link to={`/editar/${item.id}`}>Editar</Link>
                <button onClick={() => handleDelete(item.id)}>Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListaCatalogo;