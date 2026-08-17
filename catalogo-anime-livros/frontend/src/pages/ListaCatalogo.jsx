import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ListaCatalogo() {
  const [itens, setItens] = useState([]);

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

  return (
    <div>
      <h1>Meu Catálogo</h1>
      <ul>
        {itens.map((item) => (
          <li key={item.id}>
            {item.titulo} — {item.status}
            <Link to={`/editar/${item.id}`}>Editar</Link>
            <button onClick={() => handleDelete(item.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaCatalogo;