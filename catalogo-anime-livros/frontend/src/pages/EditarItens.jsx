import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditarItem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    titulo: '',
    tipo: 'anime',
    status: 'quero_ver',
    nota: '',
    comentario: '',
  });

  useEffect(() => {
    fetch(`http://localhost:3000/catalogo/${id}`)
      .then((resposta) => resposta.json())
      .then((dados) => setFormulario(dados));
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`http://localhost:3000/catalogo/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formulario),
    })
      .then((resposta) => resposta.json())
      .then(() => {
        navigate('/');
      });
  }

  return (
    <div>
      <h1>Editar Item</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={formulario.titulo}
          onChange={(e) => setFormulario({ ...formulario, titulo: e.target.value })}
        />

        <select
          value={formulario.tipo}
          onChange={(e) => setFormulario({ ...formulario, tipo: e.target.value })}
        >
          <option value="anime">Anime</option>
          <option value="livro">Livro</option>
        </select>

        <select
          value={formulario.status}
          onChange={(e) => setFormulario({ ...formulario, status: e.target.value })}
        >
          <option value="quero_ver">Quero ver</option>
          <option value="em_andamento">Em andamento</option>
          <option value="completo">Completo</option>
        </select>

        <input
          type="number"
          value={formulario.nota}
          onChange={(e) => setFormulario({ ...formulario, nota: Number(e.target.value) })}
        />

        <input
          type="text"
          value={formulario.comentario}
          onChange={(e) => setFormulario({ ...formulario, comentario: e.target.value })}
        />

        <button type="submit">Salvar edição</button>
      </form>
    </div>
  );
}

export default EditarItem;