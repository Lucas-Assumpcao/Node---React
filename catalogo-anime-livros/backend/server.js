const express = require('express');
const cors = require('cors');
const catalogoRoutes = require('./routes/catalogo');

const app = express();
const PORTA = 3000;

app.use(cors());
app.use(express.json());
app.use('/catalogo', catalogoRoutes);


app.get('/', (req, res) => {
  res.json({ mensagem: 'API funcionando com nodemon!' });
});



app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});


