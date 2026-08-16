import { useState, useEffect } from 'react';

function ListaCatalogo() {
  const [itens, setItens] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/catalogo')
      .then((resposta) => resposta.json())
      .then((dados) => setItens(dados));
  }, []);

  return (
    <div>
      <h1>Meu Catálogo</h1>
      <ul>
        {itens.map((item) => (
          <li key={item.id}>
            {item.titulo} — {item.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaCatalogo;