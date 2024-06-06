const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Função para buscar ou inserir um gênero
async function findOrCreateGenero(nome_genero) {
  // Buscar pelo gênero
  const [rows] = await db.query('SELECT id FROM generos WHERE nome_genero = ?', [nome_genero]);

  // Se o gênero existir, retornar o id
  if (rows.length > 0) {
    return rows[0].id;
  }

  // Se o gênero não existir, inserir e retornar o novo id
  const [result] = await db.query('INSERT INTO generos (nome_genero) VALUES(?)',
                                                       [nome_genero]
  );
  return result.insertId;
}

app.post('/add-jogo', async (req, res) => {
  const { nome_genero, nome, lancamento, desenvolvedor } = req.body;

  try {
    // Buscar ou inserir o gênero e obter o id
    const genero_id = await findOrCreateGenero(nome_genero);

    // Inserir o jogo com o id do gênero
    await db.query(
      'INSERT INTO jogos (nome, lancamento, desenvolvedor, genero_id) VALUES (?, ?, ?, ?)',
                          [nome, lancamento, desenvolvedor, genero_id]
    );

    res.send('Jogo inserido com sucesso!');
  } catch (error) {
    res.status(500).send('Erro ao inserir o Jogo: ' + error.message);
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
