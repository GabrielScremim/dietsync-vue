const express = require("express");
const mysql = require("mysql2");

const app = express();
const port = 3001;

// Conexão com o banco MySQL
const db = mysql.createConnection({
  host: "152.67.45.167",   // IP ou hostname do servidor MySQL
  user: "fodac",        // seu usuário
  password: "senha123",   // sua senha
  database: "dietsync2" // nome do banco
});

// Testar conexão
db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
    return;
  }
  console.log("Conectado ao MySQL!");
});

// Rota para consultar todos os registros da tabela
app.get("/usuarios", (req, res) => {
  const sql = "SELECT * FROM users"; // altere para sua tabela
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ erro: "Erro ao buscar dados" });
    }
    res.json(results);
  });
});

app.get("/receitas", (req, res) => {
  const sql = "SELECT * FROM receita"; // altere para sua tabela
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ erro: "Erro ao buscar dados" });
    }
    res.json(results);
  });
});

app.get("/evolucaos", (req, res) => {
  const sql = "SELECT * FROM evolucaos"; // altere para sua tabela
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ erro: "Erro ao buscar dados" });
    }
    res.json(results);
  });
});

app.get("/treinos", (req, res) => {
  const sql = "SELECT * FROM treino"; // altere para sua tabela
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ erro: "Erro ao buscar dados" });
    }
    res.json(results);
  });
});

// Rota para consultar um registro pelo ID
app.get("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM users WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ erro: "Erro ao buscar usuário" });
    }
    if (results.length === 0) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }
    res.json(results[0]);
  });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost/api:${port}`);
});
