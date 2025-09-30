const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    const user = rows[0];

    if (!user) return res.status(401).json({ message: "Usuário não encontrado" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: "Senha incorreta" });

    const token = jwt.sign(
      { id: user.id, nome: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login realizado com sucesso",
      user: { id: user.id, nome: user.name, email: user.email },
      token
    });
  } catch (err) {
    console.error("Erro no login:", err);
    res.status(500).json({ message: "Erro no login" });
  }
};

exports.registrarUsuario = async (req, res) => {
  try {
    const { name, surname, email, password } = req.body;

    if (!name || !surname || !email || !password) {
      return res.status(400).json({ message: "Campos obrigatórios faltando" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = `INSERT INTO users (name, sobrenome, email, password) VALUES (?, ?, ?, ?)`;
    const [result] = await db.query(sql, [name, surname, email, hashedPassword]);

    res.json({ message: "Usuário cadastrado com sucesso!", userId: result.insertId });
  } catch (err) {
    console.error("Erro ao registrar usuário:", err);
    res.status(500).json({ message: "Erro ao inserir usuário." });
  }
};
