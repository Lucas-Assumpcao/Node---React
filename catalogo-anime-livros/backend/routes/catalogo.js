const express = require('express');
const router = express.Router();

let catalogo = [
  {
    id: 1,
    titulo: 'Jujutsu Kaisen',
    tipo: 'anime',
    status: 'em_andamento',
    nota: 5,
    comentario: 'Temporada 3 assistindo agora',
  },
];

router.get('/', (req, res) => {
  res.json(catalogo);
});

router.get('/:id', (req, res) => {
  const idNum = Number(req.params.id);
  const item = catalogo.find((item) => item.id === idNum);
  
  if (!item) { 
return res.status(404) 
.json({erro: "Item não encontrado"})
 }

  res.json(item);
});

router.post('/', (req, res) => {
  const { titulo, tipo, status, nota, comentario } = req.body;

  const novoId = catalogo.length > 0
    ? Math.max(...catalogo.map((item) => item.id)) + 1
    : 1;

  const novoItem = {
    id: novoId,
    titulo,
    tipo,
    status,
    nota,
    comentario,
  };

  catalogo.push(novoItem);

  res.status(201).json(novoItem);
});

router.put('/:id', (req, res) => {
  const idNum = Number(req.params.id);
  const item = catalogo.find((item) => item.id === idNum);

  const { titulo, tipo, status, nota, comentario } = req.body;

if (!item) { 
return res.status(404) 
.json({erro: "Item não encontrado"})
 }

 if (titulo) {
  item.titulo = titulo;
}

if (tipo) {
  item.tipo = tipo;
}

if (status) {
  item.status = status;
}

if (nota) {
  item.nota = nota;
}

if (comentario) {
  item.comentario = comentario;
}
  res.json(item);
});

router.delete('/:id', (req, res) => {
  // 1. Pega o id da URL (vem como texto) e converte pra número
  const idNum = Number(req.params.id);

  // 2. Verifica se o item existe ANTES de tentar remover
  //    (mesmo .find() que você já usou nas outras rotas)
  const item = catalogo.find((item) => item.id === idNum);

  // 3. Se não existir, responde 404 e para a execução ali
  if (!item) {
    return res.status(404).json({ erro: 'Item não encontrado' });
  }

  // 4. Reconstrói o array SEM o item cujo id bate com idNum
  //    Repare no !== (diferente de), não === (igual a) —
  //    queremos MANTER todo mundo, exceto o que será removido
  catalogo = catalogo.filter((item) => item.id !== idNum);

  // 5. Responde "sucesso, sem conteúdo pra devolver"
  res.status(204).send();
});

module.exports = router;


