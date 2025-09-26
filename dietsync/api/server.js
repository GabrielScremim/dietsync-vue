const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise"); // 👈 versão com promessas
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());
const port = 3001;

app.use(cors());

// Conexão com o banco MySQL (pool com promessas)
const db = mysql.createPool({
  host: "152.67.45.167",
  user: "fodac",
  password: "senha123",
  database: "dietsync_vue"
});

// =============================
// LOGIN
// =============================
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email
    ]);
    const user = rows[0];

    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Senha incorreta" });
    }

    res.json({
      message: "Login realizado com sucesso",
      user: {
        id: user.id,
        nome: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error("Erro no login:", err);
    res.status(500).json({ message: "Erro no login" });
  }
});

// =============================
// REGISTRAR USUÁRIO
// =============================
app.post("/registrarUsuario", async (req, res) => {
  try {
    const {
      name,
      surname,
      meta,
      sexo,
      data_nasc,
      peso,
      altura,
      email,
      password
    } = req.body;

    if (!name || !surname || !email || !password) {
      return res.status(400).json({ message: "Campos obrigatórios faltando" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql =
      "INSERT INTO users (name, sobrenome, meta, sexo, data_nasc, peso, altura, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const [result] = await db.query(sql, [
      name,
      surname,
      meta,
      sexo,
      data_nasc,
      peso,
      altura,
      email,
      hashedPassword
    ]);

    res.json({
      message: "Usuário cadastrado com sucesso!",
      userId: result.insertId
    });
  } catch (err) {
    console.error("Erro ao registrar usuário:", err);
    res.status(500).json({ message: "Erro ao inserir usuário." });
  }
});

// =============================
// LISTAR USUÁRIOS
// =============================
app.get("/usuarios", async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM users");
    res.json(results);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar dados" });
  }
});

// GET usuário por ID
app.get("/usuarios/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [results] = await db.query("SELECT * FROM users WHERE id = ?", [
      id
    ]);

    if (results.length === 0) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    res.json(results[0]);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar usuário" });
  }
});

// =============================
// RECEITAS
// =============================

app.get("/receitas", async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM receita");
    res.json(results);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar receitas" });
  }
});

app.get("/receitas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [results] = await db.query(
      "SELECT * FROM receita WHERE id_receitas = ?",
      [id]
    );

    if (results.length === 0) {
      return res.status(404).json({ message: "Receita não encontrada" });
    }

    res.json(results[0]);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar receita" });
  }
});

// =============================
// EVOLUÇÕES
// =============================
app.get("/evolucaos", async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM evolucaos");
    res.json(results);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar evoluções" });
  }
});

// =============================
// TREINOS
// =============================
app.post("/criarTreino", async (req, res) => {
  try {
    const {
      data,
      tipo,
      exercicios,
      repeticoes,
      series,
      objetivo,
      duracao,
      frequencia,
      nome_treino,
      dia_treino,
      fk_id_usuario_treino = 40,
    } = req.body;

    const sql =
      `INSERT INTO treino (data, tipo, exercicios, repeticoes, series, objetivo, duracao, frequencia, nome_treino, dia_treino, fk_id_usuario_treino) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 40)`;
    const [result] = await db.query(sql, [
      data,
      tipo,
      exercicios,
      repeticoes,
      series,
      objetivo,
      duracao,
      frequencia,
      nome_treino,
      dia_treino,
    ]);

    res.json({
      message: "treino cadastrado com sucesso!",
      userId: result.insertId
    });
  } catch (err) {
    console.error("Erro ao registrar treino:", err);
    res.status(500).json({ message: "Erro ao inserir treino." });
  }
});

app.get("/treinos", async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM treino");
    res.json(results);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar treinos" });
  }
});

app.get("/treinos/usuario/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [results] = await db.query(
      "SELECT * FROM treino WHERE fk_id_usuario_treino = ?",
      [id]
    );

    if (results.length === 0) {
      return res.status(404).json({ message: "Treino não encontrado" });
    }

    res.json(results);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar o treino" });
  }
});

app.get("/treinos/usuario/:id/treino/:id_treino", async (req, res) => {
  try {
    const { id, id_treino } = req.params;
    const [results] = await db.query(
      "SELECT * FROM treino WHERE fk_id_usuario_treino = ? AND id = ?",
      [id, id_treino]
    );

    if (results.length === 0) {
      return res.status(404).json({ message: "Treino não encontrado" });
    }

    res.json(results);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar o treino" });
  }
});

// =============================
// DIETAS
// =============================
app.post("/criarDieta", async (req, res) => {
  try {
    const {
      nome_dieta,
      tipo_dieta,
      calorias,
      proteinas,
      carboidratos,
      gorduras,
      data,
      refeicao,
      quantidade,
      alimentos,
      observacoes,
      fk_id_usuario_dieta = 40
    } = req.body;

    const sql =
      `INSERT INTO dietas (nome_dieta, tipo_dieta, calorias, proteinas, carboidratos, gorduras, data_dieta, refeicao, quantidade, alimentos, observacoes,  fk_id_usuario_dieta) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 40)`;
    const [result] = await db.query(sql, [
      nome_dieta,
      tipo_dieta,
      calorias,
      proteinas,
      carboidratos,
      gorduras,
      data,
      refeicao,
      quantidade,
      alimentos,
      observacoes,
    ]);

    res.json({
      message: "dieta cadastrada com sucesso!",
      userId: result.insertId
    });
  } catch (err) {
    console.error("Erro ao registrar dieta:", err);
    res.status(500).json({ message: "Erro ao inserir dieta." });
  }
});

app.get("/dietas", async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM dietas");
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar dietas" });
  }
});

app.get("/dietas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [results] = await db.query(
      "SELECT * FROM dietas WHERE fk_id_usuario_dieta = ?",
      [id]
    );

    if (results.length === 0) {
      return res.status(404).json({ message: "Dieta não encontrada" });
    }

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar dieta" });
  }
});

// =============================
// START SERVER
// =============================
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
